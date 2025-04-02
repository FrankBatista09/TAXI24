import { IsString, IsArray } from 'class-validator';

export class CreatePassengerDto {
  @IsString()
  name: string;

  @IsArray()
  location: number[];
}
