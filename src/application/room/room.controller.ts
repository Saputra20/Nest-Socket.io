import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from '@schemas/room.schema';
import { JoinDTO } from './dto';
import { Participant } from '@schemas/participant.schema';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @HttpCode(200)
  @Get('/')
  async findAll(): Promise<Room[]> {
    await this.roomService.init();
    return this.roomService.findAll();
  }

  @HttpCode(201)
  @Post('join')
  async join(@Body() joinDTO: JoinDTO): Promise<Participant> {
    return this.roomService.join(joinDTO);
  }

  @HttpCode(201)
  @Get('participants/:id')
  participants(@Param('id') id: string): Promise<Participant[]> {
    return this.roomService.participants(id);
  }
}
