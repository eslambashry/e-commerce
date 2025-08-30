import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray, IsNumber, Min, Max, IsPositive } from 'class-validator';

export class UpdateVendorDto {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString() // يتأكد أن كل عنصر في المصفوفة هو نص
  countries_supported: string[];

  @IsOptional()
  @IsArray()
  @IsString()
  services_offered: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsNumber()
  @IsPositive() 
  response_sla_hours: number;
}
