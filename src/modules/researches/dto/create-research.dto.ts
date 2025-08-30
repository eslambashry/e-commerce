import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateResearchDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
