import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Passenger, PassengerSchema } from './models/passenger.model';
import { Driver, DriverSchema } from '../drivers/models/driver.model';

import { PassengerController } from './controllers/passenger.controller';
import { PassengerService } from './services/passenger.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Passenger.name, schema: PassengerSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
  ],
  controllers: [PassengerController],
  providers: [PassengerService],
})
export class PassengersModule {}
