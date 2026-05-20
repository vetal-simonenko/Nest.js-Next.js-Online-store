import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.color.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getByStoreId(storeId: string) {
    return this.prisma.color.findMany({
      where: {
        storeId: storeId,
      },
    });
  }

  async getByID(id: string) {
    const color = await this.prisma.color.findUnique({
      where: { id: id },
    });

    if (!color) {
      throw new NotFoundException('Color not found');
    }

    return color;
  }

  async create(storeId: string, dto: ColorDto) {
    return this.prisma.color.create({
      data: {
        ...dto,
        storeId: storeId,
      },
    });
  }

  async update(id: string, dto: ColorDto) {
    await this.getByID(id);

    return this.prisma.color.update({
      where: { id: id },
      data: {
        ...dto,
      },
    });
  }

  async delete(id: string) {
    await this.getByID(id);

    return this.prisma.color.delete({
      where: { id: id },
    });
  }
}
