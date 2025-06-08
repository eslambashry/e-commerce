import { Injectable, Post } from '@nestjs/common';
import { signUpDto } from '../dto/auth.dto';

@Injectable()
export class SignUpService {

    signUp(body: signUpDto): string {
        // Here you would typically handle user registration logic,
        console.log(body);
        
        // such as saving the user to a database.
        // For this example, we'll just return a success message.
        return 'User registered successfully';
    }}
