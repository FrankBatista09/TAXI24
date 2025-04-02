import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './models/trip.model';
import { Driver, DriverSchema } from '../drivers/models/driver.model';
import { TripController } from './controllers/trip.controller';
import { TripService } from './services/trip.service';
import { InvoicesModule } from '../invoices/invoices.module'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Trip.name, schema: TripSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
    InvoicesModule,
  ],
  controllers: [TripController],
  providers: [TripService],
})
export class TripsModule {}
