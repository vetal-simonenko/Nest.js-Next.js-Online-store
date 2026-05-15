import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-users.dto';
import { AuthGuard } from './guards/auth.guards';

@Controller({
  path: '/users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/search')
  getUserBySearch(@Query('name') name: string) {
    return this.usersService.getUserBySearch(name);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  getUserByID(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserByID(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.usersService.createUser(body);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.usersService.updateUser(Number(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(Number(id));
  }
}
