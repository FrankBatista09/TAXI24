import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Driver, DriverDocument } from '../models/driver.model';
import { Model } from 'mongoose';
import { CreateDriverDto } from '../dtos/create-driver.dto';

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver.name) private model: Model<DriverDocument>) {}

  async create(dto: CreateDriverDto) {
    try {
      return await this.model.create(dto);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el conductor');
    }
  }

  async findAll() {
    try {
      return await this.model.find().exec();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los conductores');
    }
  }

  async findAvailable() {
    try {
      return await this.model.find({ isAvailable: true }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener conductores disponibles');
    }
  }

  async findNearby(lng: number, lat: number) {
    try {
      return await this.model.find({
        isAvailable: true,
        location: {
          $near: {
            $geometry: { type: 'Point', coordinates: [lng, lat] },
            $maxDistance: 3000, // metros (3km)
          },
        },
      }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error al buscar conductores cercanos');
    }
  }

  async findById(id: string) {
    try {
      const driver = await this.model.findById(id).exec();
      if (!driver) throw new NotFoundException('Conductor no encontrado');
      return driver;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Error al obtener conductor por ID');
    }
  }
}
