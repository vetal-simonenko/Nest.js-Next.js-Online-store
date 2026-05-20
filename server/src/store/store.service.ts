import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Store } from '../../generated/prisma/client';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.store.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getByID(storeId: string, userId: string) {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId, userId: userId },
    });

    if (!store) {
      throw new NotFoundException('Store not found');
    }

    return store;
  }

  async create(userId: string, dto: CreateStoreDto) {
    return this.prisma.store.create({
      data: {
        ...dto,
        userId: userId,
      },
    });
  }

  async update(storeId: string, userId: string, dto: UpdateStoreDto) {
    await this.getByID(storeId, userId);

    return this.prisma.store.update({
      where: { id: storeId, userId: userId },
      data: {
        ...dto,
        userId: userId,
      },
    });
  }

  async delete(storeId: string, userId: string) {
    await this.getByID(storeId, userId);

    return this.prisma.store.delete({
      where: { id: storeId },
    });
  }
}
