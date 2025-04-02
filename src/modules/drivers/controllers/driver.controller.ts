import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { DriverService } from '../services/driver.service';
import { CreateDriverDto } from '../dtos/create-driver.dto';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  create(@Body() dto: CreateDriverDto) {
    return this.driverService.create(dto);
  }

  @Get()
  getAll() {
    return this.driverService.findAll();
  }

  @Get('available')
  getAvailable() {
    return this.driverService.findAvailable();
  }

  @Get('nearby')
  getNearby(@Query('lng') lng: string, @Query('lat') lat: string) {
    return this.driverService.findNearby(parseFloat(lng), parseFloat(lat));
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.driverService.findById(id);
  }
}
