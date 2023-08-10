import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@schemas/user.schema';
import { LoginDTO } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Post('login')
  create(@Body() loginDTO: LoginDTO): Promise<User> {
    console.log(loginDTO);
    return this.userService.create(loginDTO);
  }
}
