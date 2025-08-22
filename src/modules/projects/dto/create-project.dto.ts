import { IsString, IsNotEmpty, IsArray, IsNumber, Min } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty() // <-- هذا الحقل لا يمكن أن يكون فارغاً
  country: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  services_needed: string[];

  @IsNumber()
  @Min(0)
  budget: number;
}
