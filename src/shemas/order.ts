import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IOrder } from '../interfaces/order';
 
export type OrderDocument = HydratedDocument<Order>;
 
@Schema()
export class Order implements IOrder {
    @Prop() age: string;
 
    @Prop() birthDay: string;
 
    @Prop() cardNumber: string;
 
    @Prop() userId: string;

    @Prop() tourId: string;
}
 
export const OrderSchema = SchemaFactory.createForClass(Order);