import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from '@schemas/room.schema';
import { JoinDTO } from './dto';
import { Participant } from '@schemas/participant.schema';
import { Conversation } from '@schemas/conversation.schema';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @HttpCode(200)
  @Get('/')
  async findAll(): Promise<Room[]> {
    await this.roomService.init();
    return this.roomService.findAll();
  }

  @HttpCode(200)
  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Room> {
    return this.roomService.findOne(id);
  }

  @HttpCode(200)
  @Post('already-join')
  async alreadyJoin(@Body() joinDTO: JoinDTO): Promise<boolean> {
    return this.roomService.alreadyJoin(joinDTO);
  }

  @HttpCode(201)
  @Post('join')
  async join(@Body() joinDTO: JoinDTO): Promise<Participant> {
    return this.roomService.join(joinDTO);
  }

  @HttpCode(200)
  @Get('participants/:id')
  participants(@Param('id') id: string): Promise<Participant[]> {
    return this.roomService.participants(id);
  }

  @HttpCode(200)
  @Get('conversation/:id')
  conversation(@Param('id') id: string): Promise<Conversation[]> {
    return this.roomService.conversation(id);
  }
}
