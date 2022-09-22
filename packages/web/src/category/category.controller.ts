import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from "./category.service";

@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async add(@Request() req, @Body() categoryDto: any) {
    try {
      return await this.categoryService.add(req.userId, categoryDto)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  async update(@Body() categoryDto: any) {
    try {
      return await this.categoryService.update(categoryDto)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('remove')
  async remove(@Request() req, @Body() categoryDto: any) {
    try {
      return await this.categoryService.remove(req.userId, categoryDto.id)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/pages/')
  async notes(@Param('id') id) {
    try {
      return await this.categoryService.pages(id)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }
}
