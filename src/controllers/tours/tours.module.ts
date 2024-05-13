import { Module } from '@nestjs/common';
import { ToursController } from './tours.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from 'src/static/private/constants';
import { JwtStrategyService } from 'src/services/jwt-strategy/jwt-strategy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tour, TourSchema } from 'src/shemas/tour';
import { ToursService } from 'src/services/tours/tours.service';
import { TourItemController } from '../tour-item/tour-item.controller';

@Module({
    controllers: [ToursController, TourItemController],
    imports: [
        MongooseModule.forFeature([{name: Tour.name, schema: TourSchema}]),
        PassportModule,
        JwtModule.register({
            secret: jwtConst.secret,
            signOptions: {expiresIn: '60s'}})
    ],
    providers: [JwtStrategyService, ToursService]
})
export class ToursModule {}
