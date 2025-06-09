import { Body, Controller, Post } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { signUpDto } from '../dto/auth.dto';

@Controller('sign-in')
export class SignInController {

        constructor(private signUpService: SignInService) {}
    
        @Post()
        signIn(@Body() body: signUpDto) {
            return this.signUpService.signIn(body);
        }
}
