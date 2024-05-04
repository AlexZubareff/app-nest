import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConst } from 'src/static/private/constants';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConst.secret,
    });
  }

  async validate(payload: any) {
    console.log('payload: ', payload)
    return { userId: payload.sub, username: payload.username };
  }
}