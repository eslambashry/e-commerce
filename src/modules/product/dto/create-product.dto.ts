import { IsString, IsNumber, IsUrl } from 'class-validator';

export class CreateProductDto {

  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsString()
  cat_prefix: string;

  @IsUrl()
  img: string;

  @IsNumber()
  max: number;

  @IsString()
  owner: string; // Assuming owner is a string representing user ID
}
