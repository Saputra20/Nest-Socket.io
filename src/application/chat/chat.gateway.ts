import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client id connect : ${client.handshake.query.id}`);
    // this.server.emit(`${client.handshake.query.id}`, 'Hello');
  }

  @SubscribeMessage('message')
  message(@MessageBody() data: any) {
    console.log(data);
    this.server.emit(data.userId, data.message);
  }
}
