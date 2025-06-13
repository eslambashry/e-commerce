import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly _jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let token = context.switchToHttp().getRequest().headers.token;
    console.log('AuthGuard: Checking token:', token);
    
    if (!token) {
      console.log('AuthGuard: Token not found')
      return false;
    }
    console.log(process.env.JWT_SECRET);
    
    let decoded = this._jwtService.verify(token, { secret: process.env.JWT_SECRET });
    if (!decoded) {
      console.log('AuthGuard: Token verification failed')
      return false;
    }


    console.log('AuthGuard: Token found')
    return true;
  }
}
