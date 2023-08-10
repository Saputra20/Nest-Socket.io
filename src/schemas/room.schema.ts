import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ collection: 'rooms' })
export class Room {
  @Prop({ required: true })
  channel: string;

  @Prop({ required: true })
  name: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
