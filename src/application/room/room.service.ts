import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Participant } from '@schemas/participant.schema';
import { Room } from '@schemas/room.schema';
import { Model } from 'mongoose';
import { JoinDTO } from './dto';
import { User } from '@schemas/user.schema';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async init(): Promise<Room[]> {
    const checkData = await this.roomModel.findOne({ channel: 'room-1' });
    if (!checkData) {
      return this.roomModel.insertMany([
        {
          name: 'Room 1',
          channel: 'room-1',
        },
        {
          name: 'Room 2',
          channel: 'room-2',
        },
        {
          name: 'Room 3',
          channel: 'room-3',
        },
      ]);
    }
    return null;
  }

  findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  findOne(id: string): Promise<Room> {
    return this.roomModel.findOne({ $or: [{ channel: id }, { id }] });
  }

  async join(joinDTO: JoinDTO): Promise<Participant> {
    const isJoin = await this.participantModel.findOne({
      userId: joinDTO.userId,
      roomId: joinDTO.roomId,
    });

    if (!isJoin) {
      const user = await this.userModel.findById(joinDTO.userId);
      return this.participantModel.create({
        ...joinDTO,
        name: user.name,
        email: user.email,
      });
    }

    return isJoin;
  }

  participants(roomId: string): Promise<Participant[]> {
    return this.participantModel.find({ roomId }).exec();
  }
}
