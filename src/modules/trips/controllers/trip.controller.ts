import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TripService } from '../services/trip.service';
import { CreateTripDto } from '../dtos/create-trip.dto';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post('request/auto')
  createAuto(@Body() dto: CreateTripDto) {
    return this.tripService.createAuto(dto);
  }

  @Post('request/manual')
  createManual(@Body() dto: CreateTripDto){
    return this.tripService.createManual(dto);
  }

  @Post(':id/complete')
  complete(@Param('id') id: string) {
    return this.tripService.complete(id);
  }

  @Get('active')
  findActive() {
    return this.tripService.findActive();
  }
}
