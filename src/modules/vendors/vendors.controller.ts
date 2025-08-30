import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    HttpCode,
    HttpStatus,
    HttpException
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Controller('vendors')
export class VendorsController {


    constructor(private readonly vendorServese: VendorsService) { }

    @Post()
    create(@Body() createVendorDto: CreateVendorDto) {
        console.log(createVendorDto);
        
        return this.vendorServese.create(createVendorDto);
    }

    @Get()
    findAll() {
        return this.vendorServese.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        // ParseUUIDPipe يتأكد أن الـ id هو UUID صالح
        return this.vendorServese.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateVendorDto: UpdateVendorDto,
    ) {
        return this.vendorServese.update(id, updateVendorDto);
  
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.vendorServese.remove(id);
    }
}