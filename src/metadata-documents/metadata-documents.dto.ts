import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class CloneDocumentDto {
  @IsUUID()
  template_id: string;

  @IsUUID()
  owner_id: string;
}

export class PublishDocumentDto {
  @IsUUID()
  id: string;
}

// export class SaveDocumentDto {
//   @IsUUID()
//   id: string;
//
//   @IsOptional()
//   @IsString()
//   @MinLength(1)
//   content?: string;
// }
