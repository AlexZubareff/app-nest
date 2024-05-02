import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { log } from 'console';
import { UserDto } from 'src/dto/user-dto';
import { UsersService } from 'src/services/users/users.service';
import { User } from 'src/shemas/user';

@Controller('users')
export class UsersController {
 
    constructor(private userService: UsersService) {}

  @Get()
  getAllUsers(): Promise<User[]>{
    return this.userService.getAllUsers();
  }

  @Get(":id")
  getUserById(@Param('id') id): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  sendUser(@Body() data: UserDto): Promise<User> {
    return this.userService.checkRegUser(data.login).then((queryRes) => {
      console.log('data reg', queryRes)
      if (queryRes.length === 0) {
          return this.userService.sendUser(data);
      } else {
          console.log('err - user is exists')
          return Promise.reject();
      }
  });
  }

  @Post(":login")
  authUser(@Body() data: UserDto, @Param('login') login): Promise<User | boolean>  {
    
      return this.userService.checkAuthUser(data.login, data.password).then((queryRes) => {
        console.log('queryRes: ', queryRes);
          if (queryRes.length !== 0) {
              return Promise.resolve(true);
          } else {
              console.log('err - user is exists')
              return Promise.reject();
          }
      });

  }


  @Put(":id")
  updateUser(@Param('id') id, @Body() data): Promise<User> {
    return this.userService.updateUser(id, data);
  }

  // @Delete()
  // deleteUser(): Promise<User> {
  //   return this.userService.deleteUser();
  // }

  @Delete(":id")
  deleteUserById(@Param('id') id): Promise<User> {
    return this.userService.deleteUserById(id);
  }
}
