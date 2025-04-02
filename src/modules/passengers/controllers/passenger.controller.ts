import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PassengerService } from '../services/passenger.service';
import { CreatePassengerDto } from '../dtos/create-passenger.dto';

@Controller('passengers')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  create(@Body() dto: CreatePassengerDto) {
    return this.passengerService.create(dto);
  }

  @Get()
  getAll() {
    return this.passengerService.findAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.passengerService.findById(id);
  }

  @Get(':id/nearest-drivers')
  getNearestDrivers(@Param('id') id: string) {
    return this.passengerService.findNearestDrivers(id);
  }
}
