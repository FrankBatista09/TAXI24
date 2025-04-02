import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { Passenger, PassengerDocument } from '../models/passenger.model';
  import { CreatePassengerDto } from '../dtos/create-passenger.dto';
  import { Driver, DriverDocument } from '../../drivers/models/driver.model';
  
  @Injectable()
  export class PassengerService {
    constructor(
      @InjectModel(Passenger.name) private passengerModel: Model<PassengerDocument>,
      @InjectModel(Driver.name) private driverModel: Model<DriverDocument>
    ) {}
  
    async create(dto: CreatePassengerDto) {
      try {
        return await this.passengerModel.create(dto);
      } catch (error) {
        throw new InternalServerErrorException('Error al crear el pasajero');
      }
    }
  
    async findAll() {
      try {
        return await this.passengerModel.find().exec();
      } catch (error) {
        throw new InternalServerErrorException('Error al obtener los pasajeros');
      }
    }
  
    async findById(id: string) {
      try {
        const passenger = await this.passengerModel.findById(id).exec();
        if (!passenger) throw new NotFoundException('Pasajero no encontrado');
        return passenger;
      } catch (error) {
        if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException('Error al buscar pasajero');
      }
    }
  
    async findNearestDrivers(passengerId: string) {
      try {
        const passenger = await this.passengerModel.findById(passengerId).exec();
        if (!passenger) throw new NotFoundException('Pasajero no encontrado');
  
        return await this.driverModel.find({
          isAvailable: true,
          location: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: passenger.location,
              },
              $maxDistance: 5000, // límite de búsqueda opcional (5km)
            },
          },
        })
        .limit(3)
        .exec();
      } catch (error) {
        if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException('Error al obtener conductores cercanos');
      }
    }
  }
  