import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from 'src/services/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/shemas/user';
import { AuthService } from 'src/services/authentication/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConst } from 'src/static/private/constants';
import { JwtStrategyService } from 'src/services/jwt-strategy/jwt-strategy.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        PassportModule,
        JwtModule.register({
            secret: jwtConst.secret,
            signOptions: {expiresIn: '60s'},
        })
],
    controllers: [ UsersController],
    providers: [
        UsersService,
        AuthService,
        JwtStrategyService
    ],
})
export class UsersModule {}
