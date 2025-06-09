import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { updateUserDto } from './dto/update-user';

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
        async updateInUser(@Param('id') id: string, @Body() userData: Partial<updateUserDto>) {
        return await this.userService.updateUser(id, userData);
        }

        @Delete('/:id')
        async deleteUser(@Param('id') id: string) {
            return await this.userService.deleteUser(id);
        }

}
