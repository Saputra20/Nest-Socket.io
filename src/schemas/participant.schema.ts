import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ParticipantDocument = HydratedDocument<Participant>;

@Schema({ collection: 'participants' })
export class Participant {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  roomId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);
