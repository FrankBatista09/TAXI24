import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice, InvoiceDocument } from '../models/invoice.model';
import { Trip, TripDocument } from '../../trips/models/trip.model';
import { Model } from 'mongoose';
import { Driver, DriverDocument } from '../../drivers/models/driver.model';
import { Passenger, PassengerDocument } from '../../passengers/models/passenger.model';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
    @InjectModel(Driver.name) private driverModel: Model<DriverDocument>,
    @InjectModel(Passenger.name) private passengerModel: Model<PassengerDocument>,
  ) {}

  async generateFromTrip(tripId: string) {
    try {
      const trip = await this.tripModel.findById(tripId).exec();
      if (!trip || trip.status !== 'completed') {
        throw new NotFoundException('El viaje no existe o no está completado');
      }
  
      const [driver, passenger] = await Promise.all([
        this.driverModel.findById(trip.driverId).exec(),
        this.passengerModel.findById(trip.passengerId).exec(),
      ]);
  
      if (!driver || !passenger) {
        throw new NotFoundException('Driver o Passenger no encontrados');
      }
  
      const amount = 100 + Math.floor(Math.random() * 50);
  
      const invoice = await this.invoiceModel.create({
        tripId: trip._id,
        driverId: driver._id,
        passengerId: passenger._id,
        amount,
      });
  
      return {
        ...invoice.toObject(),
        driverName: driver.name,
        passengerName: passenger.name,
      };
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al generar la factura');
    }
  }

  async findAll() {
    try {
      return await this.invoiceModel.find().exec();
    }
    catch(error) {
      throw new InternalServerErrorException('Error al listar las facturas');
    }
  }
  
}
