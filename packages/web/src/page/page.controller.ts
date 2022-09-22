import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { PageService } from "./page.service";

@Controller('api/page')
export class PageController {
  constructor(private pageService: PageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  async update(@Body() pageDto: any) {
    try {
      return await this.pageService.update(pageDto)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/notes/')
  async notes(@Param('id') id) {
    try {
      return await this.pageService.notes(id)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('query')
  async query(@Body() pageDto: any) {
    try {
      return await this.pageService.query(pageDto)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }
}
