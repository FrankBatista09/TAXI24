import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateTripDto {
  @IsString()
  passengerId: string;

  @IsArray()
  dropoffLocation: number[];

  @IsOptional()
  @IsString()
  driverId?: string
}
