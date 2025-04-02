import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PassengerDocument = Passenger & Document;

@Schema({ timestamps: true })
export class Passenger {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Number], index: '2dsphere' }) // [lng, lat]
  location: number[];
}

export const PassengerSchema = SchemaFactory.createForClass(Passenger);
