import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema({ timestamps: true })
export class Invoice {
  @Prop({ required: true })
  tripId: string;

  @Prop({ required: true })
  driverId: string;

  @Prop({ required: true })
  passengerId: string;

  @Prop({ required: true })
  amount: number;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
