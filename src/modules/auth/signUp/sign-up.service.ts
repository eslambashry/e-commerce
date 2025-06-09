import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { signUpDto } from '../dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/core/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignUpService {

      constructor(@InjectModel(User.name) private UserModel: Model<User>) {}
      private readonly logger = new Logger(SignUpService.name);

//   async create(body: signUpDto): Promise<User> {
//     const createdCat = new this.catModel(signUpDto);
//     return createdCat.save();
//   } 

//   async findAll(): Promise<User[]> {
//     return this.catModel.find().exec();
//   }
    async signUp(body: signUpDto){
        // Here you would typically handle user registration logic,
            this.logger.log('Starting signUp process...');
        
        if(!body.name || !body.email || !body.password) {
            throw new HttpException('All fields are required', HttpStatus.BAD_REQUEST);
        }

        const emailExsists = await this.UserModel.findOne({ email: body.email });
        
        if(emailExsists) {
            this.logger.warn(`Attempted registration with existing email: ${body.email}`);
            throw new HttpException('Email is already exsist', HttpStatus.CONFLICT);
        }
        this.logger.debug(`password: ${body.password}`);

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(body.password, saltOrRounds);
        this.logger.debug(`hash${hash}`);
        
        const userData = {
            name: body.name,
            email: body.email,
            password: hash
        }
        
        const user = new this.UserModel(userData);
        // such as saving the user to a database.
        user.save();
        
        this.logger.log(`User created successfully: ${body.email}`);

        // For this example, we'll just return a success message.
        throw new HttpException('User created 👤', HttpStatus.ACCEPTED)
}}