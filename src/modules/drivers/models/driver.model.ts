import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DriverDocument = Driver & Document;

@Schema({ timestamps: true })
export class Driver {
  @Prop({ required: true })
  name: string;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: [Number], index: '2dsphere' }) // [lng, lat]
  location: number[];
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
