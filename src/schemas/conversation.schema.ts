import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ collection: 'conversations' })
export class Conversation {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  message: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
