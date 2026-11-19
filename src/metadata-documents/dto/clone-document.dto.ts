import { IsUUID } from 'class-validator';

export class CloneDocumentDto {
  @IsUUID()
  template_id: string;

  @IsUUID()
  owner_id: string;
}
