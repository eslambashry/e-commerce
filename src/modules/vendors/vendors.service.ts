import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vendor } from './entities/vendor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

@Injectable()
export class VendorsService {
    constructor(
        @InjectRepository(Vendor)
        private readonly vendorsRepository: Repository<Vendor>,
    ){}

       async create(createVendorDto: CreateVendorDto): Promise<Vendor> {
        const newVendor = this.vendorsRepository.create(createVendorDto);
        return this.vendorsRepository.save(newVendor);
      }
    
       async findAll(): Promise<Vendor[]> {
        return this.vendorsRepository.find();
      }
    
       async findOne(id: string): Promise<Vendor> {
        const Vendor = await this.vendorsRepository.findOneBy({ id });
        if (!Vendor) {
           throw new NotFoundException(`Vendor with ID "${id}" not found`);
        }
        return Vendor;
      }
    
       async update(id: string, updateVendorDto: UpdateVendorDto): Promise<Vendor> {
         const Vendor = await this.vendorsRepository.preload({
          id: id,
          ...updateVendorDto,
        });
        if (!Vendor) {
          throw new NotFoundException(`Vendor with ID "${id}" not found`);
        }
        return this.vendorsRepository.save(Vendor);
      }
    
       async remove(id: string): Promise<void> {
        const result = await this.vendorsRepository.delete(id);
        if (result.affected === 0) {
           throw new NotFoundException(`Vendor with ID "${id}" not found`);
        }
        else{
            throw new HttpException('Vendor Deleted', HttpStatus.ACCEPTED);
        }
      }
}
