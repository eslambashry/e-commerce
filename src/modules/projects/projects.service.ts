import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
 
@Injectable()
export class ProjectsService {
   constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

   async create(createProjectDto: CreateProjectDto): Promise<Project> {
    console.log(createProjectDto);
    
    const newProject = this.projectsRepository.create(createProjectDto);
    console.log(newProject);
    
    return this.projectsRepository.save(newProject);
  }

   async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

   async findOne(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOneBy({ id });
    if (!project) {
       throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return project;
  }

   async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
     const project = await this.projectsRepository.preload({
      id: id,
      ...updateProjectDto,
    });
    if (!project) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    return this.projectsRepository.save(project);
  }

   async remove(id: string): Promise<void> {
    const result = await this.projectsRepository.delete(id);
    if (result.affected === 0) {
       throw new NotFoundException(`Project with ID "${id}" not found`);
    }
    else{
        throw new HttpException('Project Deleted', HttpStatus.ACCEPTED);
    }
  }
}
