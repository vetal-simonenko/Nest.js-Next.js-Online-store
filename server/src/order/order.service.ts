import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma.service';
import { OrderDto } from './dto/order.dto';
import { EnumOrderStatus } from '../../generated/prisma/enums';

@Injectable()
export class OrderService {
  private readonly stripe: InstanceType<typeof Stripe>;

  constructor(private readonly prisma: PrismaService) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }

    this.stripe = new Stripe(stripeSecretKey);
  }

  async createPayment(dto: OrderDto, userId: string) {
    const orderItems = dto.items.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      product: {
        connect: {
          id: item.productId,
        },
      },
      store: {
        connect: {
          id: item.storeId,
        },
      },
    }));

    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        status: dto.status,
        items: {
          create: orderItems,
        },
        total,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],

      line_items: dto.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: `Product ${item.productId}`,
          },
        },
      })),

      success_url: `${process.env.CLIENT_URL}/thanks?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,

      metadata: {
        orderId: order.id,
        userId,
      },

      payment_intent_data: {
        metadata: {
          orderId: order.id,
          userId,
        },
      },
    });

    return {
      id: session.id,
      url: session.url,
    };
  }

  async updateStatus(signature: string, rawBody?: Buffer) {
    if (!rawBody) {
      throw new BadRequestException('Raw body is required for Stripe webhook');
    }

    if (!signature) {
      throw new BadRequestException('Stripe signature is missing');
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new BadRequestException('STRIPE_WEBHOOK_SECRET is not configured');
    }

    let event: ReturnType<typeof this.stripe.webhooks.constructEvent>;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        webhookSecret,
      );
    } catch {
      throw new BadRequestException('Invalid Stripe webhook signature');
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as {
        metadata?: {
          orderId?: string | null;
          userId?: string | null;
        } | null;
      };

      const orderId = session.metadata?.orderId;

      if (!orderId) {
        throw new BadRequestException('Order ID is missing in Stripe metadata');
      }

      await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: EnumOrderStatus.PAID,
        },
      });
    }

    return true;
  }
}
