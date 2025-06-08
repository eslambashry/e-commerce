import { Module } from '@nestjs/common';
import { SignUpController } from './signUp/sign-up.controller';
import { SignInController } from './signIn/sign-in.controller';
import { SignUpService } from './signUp/sign-up.service';
import { SignInService } from './signIn/sign-in.service';

@Module({
    controllers: [SignUpController,SignInController],
    providers: [SignUpService,SignInService],
})
export class AuthModule {}
