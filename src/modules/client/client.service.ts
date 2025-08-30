import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/CreateClientDto';
import { UpdateClientDto } from './dto/UpdateClientDto';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,  
    ){}

    async create(createClientDto: CreateClientDto): Promise<Client> {
        const newClient = this.clientRepository.create(createClientDto);
        console.log(newClient);
        return this.clientRepository.save(newClient);
    }
    async findAll(): Promise<Client[]> {
    return this.clientRepository.find();
    }

    async findOne(id: string): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
        throw new NotFoundException(`client with ID "${id}" not found`);
    }
    return client;
    }

    async update(id: string, UpdateClientDto: UpdateClientDto): Promise<Client> {
        const client = await this.clientRepository.preload({
        id: id,
        ...UpdateClientDto,
    });
    if (!client) {
        throw new NotFoundException(`client with ID "${id}" not found`);
    }
    return this.clientRepository.save(client);
    }

    async remove(id: string): Promise<void> {
    const result = await this.clientRepository.delete(id);
    if (result.affected === 0) {
        throw new NotFoundException(`client with ID "${id}" not found`);
    }
    else{
        throw new HttpException('client Deleted', HttpStatus.ACCEPTED);
    }
    }
}
