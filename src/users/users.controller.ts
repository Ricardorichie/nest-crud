import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // 👈 Route path
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get() // 👈 Route path === /users GET or  /users?role=value&age=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  @Get(':id') // 👈 Route path === /users/:id GET
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post() // 👈 Route path === /users POST
  create(@Body() user: any) {
    return this.usersService.create(user);
  }

  @Patch(':id') // 👈 Route path === /users POST
  update(@Param('id') id: string, @Body() user: any) {
    return this.usersService.update(+id, user);
  }

  @Delete(':id') // 👈 Route path === /users DELETE
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
