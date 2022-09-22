import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginName: string, password: string): Promise<any> {
    const user = await this.userService.login({
      loginName,
      password
    });

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { loginName: user.loginName, id: user.id };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
