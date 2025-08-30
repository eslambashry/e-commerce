import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  company_name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  contact_email?: string;
}