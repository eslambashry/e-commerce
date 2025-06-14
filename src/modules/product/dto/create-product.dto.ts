import { IsString, IsNumber, IsUrl, IsMongoId, IsNotEmpty } from 'class-validator';

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
    @IsMongoId()
    @IsNotEmpty()
    owner: string;  // This will be a MongoDB ObjectId as string
}
