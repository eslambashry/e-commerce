import { IsString, IsUrl, IsNumber } from 'class-validator';

export class CreateCategoryDto {

  @IsString()
  title: string;

  @IsString()
  prefix: string;

  @IsUrl()
  img: string;
}
