import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/core/schemas/user.schema';
import { signUpDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignInService {

      constructor(@InjectModel(User.name) private userModel: Model<User>,private readonly jwtService: JwtService) {}
 
      async generateToken(payload: any): Promise<string> {
            return this.jwtService.signAsync(payload);
        }

      async verifyToken(token: string) {
            return this.jwtService.verifyAsync(token);
        }


      async signIn(body: signUpDto){
         const user = await this.userModel.findOne({ email: body.email });
        if(!user) {
            throw new HttpException('you should sign up first', HttpStatus.NOT_FOUND);
        }
        const isMatch = await bcrypt.compare( body.password,user.password);
        console.log("password",  body.password);
        console.log("user.password", user.password);
        console.log("isMatch", isMatch);
        
        if(!isMatch) {
            throw new HttpException('password not match', HttpStatus.CONFLICT);
        }

        
        const payload = { userId: user._id, email: user.email };

            
        const token = await this.jwtService.signAsync(payload);

        user.token = token;

        user.save();

        return user;
    }

}
