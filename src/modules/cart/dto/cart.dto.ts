import { IsString, IsNotEmpty, IsArray, IsNumber, IsOptional, ValidateNested, Min } from "class-validator";
import { Type } from "class-transformer";

class CartProductDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @Min(1)
    @IsOptional()
    quantity: number = 1;
}

export class AddToCartDto {
    @IsString()
    @IsNotEmpty()
    owner: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartProductDto)
    products: CartProductDto[];

    @IsNumber()
    @Min(0)
    @IsOptional()
    totalPrice: number = 0;

    @IsOptional()
    createdAt: Date = new Date();

    @IsOptional()
    updatedAt: Date = new Date();
}
