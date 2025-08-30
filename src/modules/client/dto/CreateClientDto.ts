import { IsString, IsNotEmpty} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @IsString()
  @IsNotEmpty()
  contact_email: string;
}
