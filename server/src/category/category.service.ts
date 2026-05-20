import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getByStoreId(storeId: string) {
    return this.prisma.category.findMany({
      where: {
        storeId: storeId,
      },
    });
  }

  async getByID(id: string) {
    const color = await this.prisma.category.findUnique({
      where: { id: id },
    });

    if (!color) {
      throw new NotFoundException('Category not found');
    }

    return color;
  }

  async create(storeId: string, dto: CategoryDto) {
    return this.prisma.category.create({
      data: {
        ...dto,
        storeId: storeId,
      },
    });
  }

  async update(id: string, dto: CategoryDto) {
    await this.getByID(id);

    return this.prisma.category.update({
      where: { id: id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string) {
    await this.getByID(id);

    return this.prisma.category.delete({
      where: { id: id },
    });
  }
}
