import { Controller, Get, Post, Body, Render, Res, Req, Redirect } from '@nestjs/common';
import type { Response } from 'express';
import { AdminService } from '../services/admin.service';

@Controller('login')
export class AuthController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @Render('login')
  getLoginPage() {
    return { error: null };
  }

  @Post()
  async login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
    @Req() req: any,
  ) {
    const isValid = await this.adminService.validateAdmin(body.username, body.password);
    
    if (isValid) {
      req.session.admin = body.username; 
      return res.redirect('/rooms');
    }
    
    return res.render('login', { error: 'Username atau Password salah!' });
  }

  @Get('/logout')
  @Redirect('/login')
  logout(@Req() req: any) {
    req.session.destroy();
  }
}