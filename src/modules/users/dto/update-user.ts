import { IsString } from "class-validator";




export class updateUserDto {

    @IsString() 
    name: string;
    
    
}