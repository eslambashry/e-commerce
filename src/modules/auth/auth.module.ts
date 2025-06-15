import { Module } from '@nestjs/common';
import { SignUpController } from './signUp/sign-up.controller';
import { SignInController } from './signIn/sign-in.controller';
import { SignUpService } from './signUp/sign-up.service';
import { SignInService } from './signIn/sign-in.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../core/schemas/user.schema'; // استخدم relative import
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from '../../core/guards/auth.guard'; // استخدم relative import

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || 'fallback-secret-key',
                signOptions: { 
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '24h' 
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [SignUpController, SignInController],
    providers: [SignUpService, SignInService, AuthGuard],
    exports: [SignUpService, SignInService, AuthGuard, JwtModule], // export للاستخدام في modules أخرى
})
export class AuthModule {}
