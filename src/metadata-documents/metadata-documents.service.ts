import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CloneDocumentDto, PublishDocumentDto } from './metadata-documents.dto';
import { document } from './metadata-documents.model';

@Injectable()
export class MetadataDocumentsService {
  private documents: document[] = [];

  findAllByOwner(ownerId: string): document[] {
    return this.documents.filter((doc) => doc.owner_id === ownerId);
  }

  findById(id: string): document {
    const found = this.documents.find((doc) => doc.id === id);
    if (!found)
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    return found;
  }

  clone(dto: CloneDocumentDto): document {
    const now = new Date().toISOString();
    const created: document = {
      id: randomUUID(),
      owner_id: dto.owner_id,
      template_id: dto.template_id,
      date_cloned: now,
      last_update: now,
    };
    this.documents.push(created);
    return created;
  }

  publish(dto: PublishDocumentDto): document {
    const doc = this.findById(dto.id);
    doc.last_update = new Date().toISOString();
    return doc;
  }

  // save(dto: SaveDocumentDto): document {
  //   const doc = this.findById(dto.id);
  //   doc.last_update = new Date().toISOString();
  //   return doc;
  // }
}
