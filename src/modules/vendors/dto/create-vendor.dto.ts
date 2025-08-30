import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  Min,
  Max,
  IsPositive,
} from 'class-validator';

export class CreateVendorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true }) // يتأكد أن كل عنصر في المصفوفة هو نص
  @IsNotEmpty({ each: true }) // يتأكد أن كل عنصر ليس سلسلة فارغة
  countries_supported: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  services_offered: string[];

  @IsNumber()
  @Min(0)
  @Max(5) // التقييم يجب أن يكون بين 0 و 5
  rating: number;

  @IsNumber()
  @IsPositive() // يجب أن يكون رقماً موجباً
  response_sla_hours: number;
}
