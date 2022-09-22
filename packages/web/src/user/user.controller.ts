import { Controller, Get, HttpException, HttpStatus, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { UserService } from "./user.service";
@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService
  ) {}

  // @Post('login')
  // async login(@Session() session: Record<string, any>, @Body() userDto: any) {
  //   try {
  //     const user = await this.userService.login(userDto)
  //     session.userId = user.id

  //     return user
  //   } catch (err) {
  //     throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
  //   }
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('category')
  async category(@Request() req) {
    try {
      return await this.userService.category(req.userId)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
    }
  }
}
