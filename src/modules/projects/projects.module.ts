import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';
import { MatchingService } from './matching.service';
import { Vendor } from '../vendors/entities/vendor.entity';
import { Match } from '../vendors/entities/matches.entity';

@Module({ 
   imports: [
    TypeOrmModule.forFeature([Project, Vendor, Match]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, MatchingService],
})
export class ProjectsModule {}
