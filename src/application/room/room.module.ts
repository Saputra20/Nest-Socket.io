import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from '@schemas/room.schema';
import { Participant, ParticipantSchema } from '@schemas/participant.schema';
import { User, UserSchema } from '@schemas/user.schema';
import { Conversation, ConversationSchema } from '@schemas/conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Room.name, schema: RoomSchema },
      { name: Participant.name, schema: ParticipantSchema },
      { name: User.name, schema: UserSchema },
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
