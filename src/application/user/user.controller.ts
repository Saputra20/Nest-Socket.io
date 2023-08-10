import { Body, Controller, Get, HttpCode, Post, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@schemas/user.schema';
import { LoginDTO } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Render('index')
  index() {
    return {};
  }

  @HttpCode(200)
  @Post('login')
  create(@Body() loginDTO: LoginDTO): Promise<User> {
    return this.userService.create(loginDTO);
  }
}
