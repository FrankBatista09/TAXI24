import { IsString, IsBoolean, IsArray } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsBoolean()
  isAvailable: boolean;

  @IsArray()
  location: number[];
}
