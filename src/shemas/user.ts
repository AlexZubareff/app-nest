import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from 'src/interfaces/user';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {

  @Prop({required: true, minlength: 2})
  login: string
 
  @Prop({required: true})
  password: string;

  @Prop()
  // ({required: true})
  email: string

  @Prop()
  cardNumber: string;

  @Prop()
  id: string

}

export const UserSchema = SchemaFactory.createForClass(User);