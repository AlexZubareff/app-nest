import { Injectable, Param } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/dto/user-dto';
import { User, UserDocument } from 'src/shemas/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async sendUser(data): Promise<User> {
    // console.log('new user: ', data);

    const salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    // console.log('new user hash pass: ', data);

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

  async checkAuthUser(login: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ login: login });
    if (!user) {
      return null;
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return null;
    }
    return user;
  }

  async checkRegUser(login: string): Promise<User[]> {
    return this.userModel.find({ login: login });
  }

  async login(user: UserDto) {
    const payload = { login: user.login, password: user.password };
    const userFromDb = await this.userModel.find({login: user.login})
    return {
      id: userFromDb[0]._id,
      access_token: this.jwtService.sign(payload),
    };
  }
}
