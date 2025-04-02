import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Taxi24 - E2E Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Crear un driver', async () => {
    const res = await request(app.getHttpServer())
      .post('/drivers')
      .send({
        name: 'Test Driver',
        isAvailable: true,
        location: [-69.88, 18.47],
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Driver');
  });

  it('Crear un passenger', async () => {
    const res = await request(app.getHttpServer())
      .post('/passengers')
      .send({
        name: 'Test Passenger',
        location: [-69.87, 18.45],
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Passenger');
  });

  it('Solicitar viaje con driver específico', async () => {
    const driverRes = await request(app.getHttpServer())
      .post('/drivers')
      .send({
        name: 'Driver Viaje',
        isAvailable: true,
        location: [-69.90, 18.44],
      });

    const passengerRes = await request(app.getHttpServer())
      .post('/passengers')
      .send({
        name: 'Passenger Viaje',
        location: [-69.91, 18.46],
      });

    const tripRes = await request(app.getHttpServer())
      .post('/trips/request/manual')
      .send({
        passengerId: passengerRes.body._id,
        driverId: driverRes.body._id,
        dropoffLocation: [-69.92, 18.43],
      });

    expect(tripRes.status).toBe(201);
    expect(tripRes.body.status).toBe('active');
    expect(tripRes.body.driverId).toBe(driverRes.body._id);
    expect(tripRes.body.passengerId).toBe(passengerRes.body._id);
  });

  it('Listar facturas existentes', async () => {
    const res = await request(app.getHttpServer()).get('/invoices');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
