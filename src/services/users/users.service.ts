import { Injectable, Param } from '@nestjs/common';

@Injectable()
export class UsersService {

 
  getAllUsers(): string {
    return 'get Data';
  }

  getUserById(param): string {
    return 'User id is: ' + param.id;
  }

  sendUser(): string {
    return 'post Data';
  }

  updateUser(): string {
    return 'put Data';
  }

  deleteUser(): string {
    return 'delete All Users Data';
  }

  deleteUserById(id: string): string {
    return 'Delete User with id: ' + id;
  }
}
