import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authservice: AuthService) {}

  // This method returns the start site of the webapplication.
  @Get()
  getHello() : string{
    return "Welcome to my web App\n Written by Emre Rauhofer";
  }

  // This method logs the users in.
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req){
    return this.authservice.login(req.user, req.body.role); 
  }
}
