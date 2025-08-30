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
    HttpException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { MatchingService } from './matching.service';


@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly projectsService: ProjectsService,
        private readonly matchingService: MatchingService,
    ) { }


  @Post(':id/matches/rebuild')
  @HttpCode(HttpStatus.CREATED)
  rebuildMatches(@Param('id', ParseUUIDPipe) id: string) {
    return this.matchingService.rebuildMatches(id);
  }

    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.create(createProjectDto);
    }

    @Get()
    findAll() {
        return this.projectsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        // ParseUUIDPipe يتأكد أن الـ id هو UUID صالح
        return this.projectsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateProjectDto: UpdateProjectDto,
    ) {
        console.log(updateProjectDto);
        if (updateProjectDto.country || updateProjectDto.budget || updateProjectDto.services_needed) {
            return this.projectsService.update(id, updateProjectDto);
        }
        else {
            throw new HttpException('No valid fields to update', HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.projectsService.remove(id);
    }
}
