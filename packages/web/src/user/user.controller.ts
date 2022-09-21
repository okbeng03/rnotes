import { Controller, Get, Post, Body, HttpException, HttpStatus, Session } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  async login(@Session() session: Record<string, any>, @Body() userDto: any) {
    try {
      const user = await this.userService.login(userDto)
      session.userId = user.id

      return user
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }

  @Get('category')
  async category(@Session() session: Record<string, any>) {
    try {
      return await this.userService.category(session.userId)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }
}
