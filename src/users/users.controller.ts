import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
 
    constructor(private userService: UsersService) {}

  @Get()
  getAllUsers(): string {
    return this.userService.getAllUsers();
  }

  @Get(":id")
  getUserById(@Param() param): string {
    return this.userService.getUserById(param);
  }

  @Post()
  sendUser(): string {
    return this.userService.sendUser();
  }

  @Put()
  updateUser(): string {
    return this.userService.updateUser();
  }

  @Delete()
  deleteUser(): string {
    return this.userService.deleteUser();
  }

  @Delete(":id")
  deleteUserById(@Param('id') id): string {
    return this.userService.deleteUserById(id);
  }
}
