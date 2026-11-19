import { IsUUID } from 'class-validator';

export class PublishDocumentDto {
  @IsUUID()
  id: string;
}
