import { Body, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { signUpDto } from '../auth/dto/auth.dto';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller('users')
export class UsersController {


        constructor(private userService: UsersService) {}
    

        @Get()
        getUsers() {
            return this.userService.getUsers();
        }

        @Get('/:id')
        getUserById(@Param('id') id: string) {
            return this.userService.getUserById(id);
        }

        @Put('/:id')
        @UseGuards(AuthGuard)
        async updateInUser(@Param('id') id: string, @Body() userData: Partial<signUpDto>) {
        return await this.userService.updateUser(id, userData);
        }

        @Delete('/:id')
        @UseGuards(AuthGuard)
        async deleteUser(@Param('id') id: string) {
            return await this.userService.deleteUser(id);
        }
  
}
