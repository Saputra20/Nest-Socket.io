import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDTO } from './dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(loginDTO: LoginDTO): Promise<User> {
    const isNewUser = await this.userModel.findOne({ email: loginDTO.email });
    if (!isNewUser) {
      const createdUser = new this.userModel(loginDTO);
      return createdUser.save();
    }
    return isNewUser;
  }
}
