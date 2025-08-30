import {Controller,    
        Get,
        Post,
        Body,
        Patch,
        Param,
        Delete,
        ParseUUIDPipe,
        HttpCode,
        HttpStatus,
        HttpException } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/CreateClientDto';
import { UpdateClientDto } from './dto/UpdateClientDto';

@Controller('client')
export class ClientController {
      constructor(private readonly clientServese: ClientService) { }
    
        @Post()
        create(@Body() createClientDto: CreateClientDto) {
            return this.clientServese.create(createClientDto);
        }
    
        @Get()
        findAll() {
            return this.clientServese.findAll();
        }
    
        @Get(':id')
        findOne(@Param('id', ParseUUIDPipe) id: string) {
            // ParseUUIDPipe يتأكد أن الـ id هو UUID صالح
            return this.clientServese.findOne(id);
        }
    
        @Patch(':id')
        update(
            @Param('id', ParseUUIDPipe) id: string,
            @Body() updateProjectDto: UpdateClientDto,
        ) {
 
            console.log(updateProjectDto);
            if (updateProjectDto.company_name || updateProjectDto.contact_email) {
                return this.clientServese.update(id, updateProjectDto);
            }
            else {
                throw new HttpException('No valid fields to update', HttpStatus.BAD_REQUEST);
            }
        }
    
        @Delete(':id')
        @HttpCode(HttpStatus.NO_CONTENT)
        remove(@Param('id', ParseUUIDPipe) id: string) {
            return this.clientServese.remove(id);
        }
}
