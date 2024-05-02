import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/shemas/user';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
 
  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async sendUser(data): Promise<User> {
    const userData = new this.userModel(data);
    return userData.save();
  }

  async updateUser(id: string, data): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data);
  }

  // async deleteUser(): Promise<User> {
  //   return this.userModel.remove();
  // }

  async deleteUserById(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id);
  }

  async checkAuthUser(login: string, password: string): Promise<User[]> {
    return this.userModel.find({login: login, password: password});
}

async checkRegUser(login: string): Promise<User[]> {
    return this.userModel.find({login: login});
}

}
