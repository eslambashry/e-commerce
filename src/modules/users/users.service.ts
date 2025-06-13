import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
 import { signUpDto } from '../auth/dto/auth.dto';

@Injectable()
export class UsersService {
      constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

    // Example method to demonstrate service functionality

    async getUsers(): Promise<string[]> {
       const users = await this.UserModel.find();
       if(!users){
        throw new HttpException('No users found', HttpStatus.NOT_FOUND)
       }
       throw new HttpException(users, HttpStatus.ACCEPTED)
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.UserModel.findById(id);
        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
        throw new HttpException(user, HttpStatus.ACCEPTED)
    }

    async updateUser(id: string, userData: Partial<signUpDto>): Promise<User> {
    const user = await this.UserModel.findByIdAndUpdate(id, userData, { new: true });
    if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
    }

    async deleteUser(id: string): Promise<string> {
        const user = await this.UserModel.findByIdAndDelete(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return 'User deleted successfully';
    }
}