import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from './models/driver.model';
import { DriverController } from './controllers/driver.controller';
import { DriverService } from './services/driver.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }])],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriversModule {}