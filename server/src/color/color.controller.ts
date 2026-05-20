import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ColorService } from './color.service';
import { Auth } from '../auth/decorators/auth.decorators';
import { CurrentUser } from '../user/decorators/user.decorator';
import { ColorDto } from './dto/color.dto';

@Controller('colors')
export class ColorController {
  constructor(private readonly color: ColorService) {}

  @Auth()
  @Get()
  async getAll() {
    return this.color.getAll();
  }

  @Auth()
  @Get('by-storeId/:storeId')
  async getByStoreId(@Param('storeId') storeId: string) {
    return this.color.getByStoreId(storeId);
  }

  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.color.getByID(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':storeId')
  async create(@Param('storeId') storeId: string, @Body() dto: ColorDto) {
    return this.color.create(storeId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: ColorDto) {
    return this.color.update(id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.color.delete(id);
  }
}
