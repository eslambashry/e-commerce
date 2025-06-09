import { IsNotEmpty, IsString,  MinLength } from "class-validator";




export class signUpDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MinLength(20)  
    name: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MinLength(20)
    email: string;
    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MinLength(20)
    password: string;
    
}