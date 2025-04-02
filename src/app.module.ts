import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { PassengersModule } from './modules/passengers/passengers.module';
import { TripsModule } from './modules/trips/trips.module';
import { InvoicesModule } from './modules/invoices/invoices.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    DriversModule,
    PassengersModule,
    TripsModule,
    InvoicesModule
  ],
})
export class AppModule {}
