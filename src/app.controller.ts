import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  sendAll(): string {
    return 'post Data'
  }

  @Put()
  update(): string {
    return 'put Data'
  }

  @Delete()
  deleteData(): string {
    return 'delete Data'
  }
}
