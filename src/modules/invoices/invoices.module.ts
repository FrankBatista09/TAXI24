import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, InvoiceSchema } from './models/invoice.model';
import { Trip, TripSchema } from '../trips/models/trip.model';
import { Driver, DriverSchema } from '../drivers/models/driver.model'; 
import { Passenger, PassengerSchema } from '../passengers/models/passenger.model';

import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Invoice.name, schema: InvoiceSchema },
      { name: Trip.name, schema: TripSchema },
      { name: Driver.name, schema: DriverSchema },   
      { name: Passenger.name, schema: PassengerSchema },
    ]),
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports: [InvoiceService],
})
export class InvoicesModule {}
