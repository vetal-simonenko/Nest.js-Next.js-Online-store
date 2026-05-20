import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '../../generated/prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(searchTerm: string) {
    if (searchTerm) {
      return this.getSearchTermFilter(searchTerm);
    }

    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
        color: true,
        review: true,
      },
    });

    return products;
  }

  private async getSearchTermFilter(searchTerm: string) {
    return {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensistive',
          },
          description: {
            contains: searchTerm,
            mode: 'insensistive',
          },
        },
      ],
    };
  }

  async getByStoreId(storeId: string) {
    return this.prisma.product.findMany({
      where: {
        storeId: storeId,
      },
      include: {
        category: true,
        color: true,
      },
    });
  }

  async getByID(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: id },
      include: {
        category: true,
        color: true,
        review: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async getByCategory(categoryId: string) {
    const products = await this.prisma.product.findMany({
      where: {
        category: {
          id: categoryId,
        },
      },
      include: {
        category: true,
      },
    });

    if (!products) {
      throw new NotFoundException('Product not found');
    }

    return products;
  }
}
