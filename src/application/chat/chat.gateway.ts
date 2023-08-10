import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Conversation } from '@schemas/conversation.schema';
import { Participant } from '@schemas/participant.schema';
import { User } from '@schemas/user.schema';
import { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection {
  constructor(
    @InjectModel(Conversation.name)
    private convertationModel: Model<Conversation>,
    @InjectModel(Participant.name) private participantModel: Model<Participant>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client id connect : ${client.handshake.query.id}`);
    // this.server.emit(`${client.handshake.query.id}`, 'Hello');
  }

  @SubscribeMessage('message')
  async message(@MessageBody() data: any) {
    const userDetail = await this.userModel.findById(data.userId);

    if (!userDetail) return null;

    const message = await this.convertationModel.create({
      roomId: data.roomId,
      message: data.message,
      email: userDetail.email,
      name: userDetail.name,
      userId: userDetail._id,
    });

    if (!message) return null;

    const participants = await this.participantModel
      .find({
        $and: [{ roomId: data.roomId }],
      })
      .then((resp) => resp.map((d) => d.userId));

    for (const participant of participants) {
      this.server.emit(participant, {
        name: userDetail.name,
        roomId: data.roomId,
        userId: userDetail._id,
        message: data.message,
      });
    }
  }
}
