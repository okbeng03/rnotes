import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, Session } from "@nestjs/common";
import { CategoryService } from "./category.service";

@Controller('api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('add')
  async add(@Session() session: Record<string, any>, @Body() categoryDto: any) {
    try {
      return await this.categoryService.add(session.userId, categoryDto)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @Post('update')
  async update(@Body() categoryDto: any) {
    try {
      return await this.categoryService.update(categoryDto)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @Post('remove')
  async remove(@Session() session: Record<string, any>, @Body() categoryDto: any) {
    try {
      return await this.categoryService.remove(session.userId, categoryDto.id)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @Get(':id/pages/')
  async notes(@Param('id') id) {
    try {
      return await this.categoryService.pages(id)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }
}
