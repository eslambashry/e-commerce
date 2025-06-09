import { Body, Controller, Post } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { signUpDto } from '../dto/auth.dto';

@Controller('sign-up')
export class SignUpController {

    constructor(private signUpService: SignUpService) {}

    @Post()
    signUp(@Body() body: signUpDto) {
        return this.signUpService.signUp(body);
    }
}
