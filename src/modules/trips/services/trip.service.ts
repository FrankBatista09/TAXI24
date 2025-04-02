import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Trip, TripDocument } from '../models/trip.model';
  import { Driver, DriverDocument } from '../../drivers/models/driver.model';
  import { CreateTripDto } from '../dtos/create-trip.dto';
  import { Model } from 'mongoose';
  import { InvoiceService } from '../../invoices/services/invoice.service';
  
  @Injectable()
  export class TripService {
    constructor(
      @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
      @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
      private invoiceService: InvoiceService,
    ) {}
  
    async createAuto(dto: CreateTripDto) {
      try {
        const availableDriver = await this.driverModel.findOneAndUpdate(
          { isAvailable: true },
          { isAvailable: false },
          { new: true },
        );
  
        if (!availableDriver) {
          throw new NotFoundException('No hay conductores disponibles');
        }
  
        const trip = new this.tripModel({
          passengerId: dto.passengerId,
          driverId: availableDriver._id,
          dropoffLocation: dto.dropoffLocation,
          status: 'active',
        });
  
        return await trip.save();
      } catch (error) {
        if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException('Error al crear el viaje automaticamente');
      }
    }

    async createManual(dto: CreateTripDto) {
      try {
        if (!dto.driverId) {
          throw new NotFoundException('Debes proporcionar un driverId');
        }
    
        const driver = await this.driverModel.findOneAndUpdate(
          { _id: dto.driverId, isAvailable: true },
          { isAvailable: false },
          { new: true },
        );
    
        if (!driver) {
          throw new NotFoundException('El conductor no está disponible o no existe');
        }
    
        const trip = new this.tripModel({
          passengerId: dto.passengerId,
          driverId: driver._id,
          dropoffLocation: dto.dropoffLocation,
          status: 'active',
        });
    
        return await trip.save();
      } catch (error) {
        if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException('Error al crear el viaje manualmente');
      }
    }

    async complete(id: string) {
      try {
        const trip = await this.tripModel.findById(id).exec();
        if (!trip) throw new NotFoundException('Viaje no encontrado');
  
        trip.status = 'completed';
        await trip.save();
  
        await this.driverModel.findByIdAndUpdate(trip.driverId, { isAvailable: true });
        await this.invoiceService.generateFromTrip(trip._id); 
        return trip;
      } catch (error) {
        if (error instanceof NotFoundException) throw error;
        throw new InternalServerErrorException('Error al completar el viaje');
      }
    }
  
    async findActive() {
      try {
        return await this.tripModel.find({ status: 'active' }).exec();
      } catch (error) {
        throw new InternalServerErrorException('Error al obtener los viajes activos');
      }
    }
  }
  