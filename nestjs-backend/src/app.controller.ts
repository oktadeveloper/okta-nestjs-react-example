import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/todolist')
  @UseGuards(AuthGuard('bearer'))
  getToDoList(): any[] {
    return this.appService.getToDoList();
  }

  @Post('/todolist')
  @UseGuards(AuthGuard('bearer'))
  markAsComplete(@Body() id: any): any {
    return this.appService.markAsComplete(id);
  }
}
