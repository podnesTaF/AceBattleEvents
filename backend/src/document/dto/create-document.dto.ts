import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  eventId: number;

  @IsString()
  downloadUrl: string;
}
