import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<any>();
    const response = context.switchToHttp().getResponse<Response>();

    if (request.session && request.session.admin) {
      return true;
    }

    response.redirect('/login');
    return false;
  }
}