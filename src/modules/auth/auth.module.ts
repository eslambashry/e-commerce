import { Module } from '@nestjs/common';
import { SignUpController } from './signUp/sign-up.controller';
import { SignInController } from './signIn/sign-in.controller';
import { SignUpService } from './signUp/sign-up.service';
import { SignInService } from './signIn/sign-in.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User,UserSchema } from 'src/core/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
        secret: 'your-secret-key', // خليك تحفظه في config أو env متغيرات
        signOptions: { expiresIn: '1h' },
        }),],
    controllers: [SignUpController, SignInController],
    providers: [SignUpService,SignInService],
})
export class AuthModule {}
