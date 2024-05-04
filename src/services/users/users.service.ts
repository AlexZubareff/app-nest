import { Injectable, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user-dto';
import { User, UserDocument } from 'src/shemas/user';

@Injectable()
export class UsersService {


  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
){}
 
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
    const usersArr = await this.userModel.find({login: login, password: password});

    return usersArr.length === 0 ? null : usersArr;
}

async checkRegUser(login: string): Promise<User[]> {
    return this.userModel.find({login: login});
}

async login(user: UserDto) {
  const payload = {login: user.login, password: user.password};
  return{
    access_token: this.jwtService.sign(payload),
  }
}


}
