import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TripDocument = Trip & Document;

@Schema({ timestamps: true })
export class Trip {
  @Prop({ required: true })
  passengerId: string;

  @Prop({ required: true })
  driverId: string;

  @Prop({ default: 'active' }) // 'active' | 'completed'
  status: string;

  @Prop({ type: [Number], required: true }) // ubicación de destino
  dropoffLocation: number[];
}

export const TripSchema = SchemaFactory.createForClass(Trip);
