import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { signUpDto } from '../dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/core/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {

      constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
    //   private readonly logger = new Logger(SignUpService.name);

    async signUp(body: signUpDto){
        // Here you would typically handle user registration logic,
            // this.logger.log('Starting signUp process...');
        
        if(!body.firstName || !body.lastName|| !body.email || !body.password) {
            throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
        }

        const emailExsists = await this.UserModel.findOne({ email: body.email });
        
        if(emailExsists) {
            // this.logger.warn(`Attempted registration with existing email: ${body.email}`);
            throw new HttpException('Email is already exsist', HttpStatus.CONFLICT);
        }
        // this.logger.debug(`password: ${body.password}`);

        const hash = await bcrypt.hash(body.password, +process.env.SALT_ROUNDS);
        // this.logger.debug(`hash${hash}`);
        
        const userData = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hash
        } 
        
        
        const user = new this.UserModel(userData);

        if(!user) {
            // this.logger.error('Failed to create user');
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        // such as saving the user to a database.
        user.save();
        
        // For this example, we'll just return a success message.
        throw new HttpException('User created 👤', HttpStatus.ACCEPTED)
}}