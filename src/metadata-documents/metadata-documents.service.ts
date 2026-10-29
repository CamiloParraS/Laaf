import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CloneDocumentDto,
  PublishDocumentDto,
  SaveDocumentDto,
} from './metadata-documents.dto';
import { DocumentMetadata } from './entities/document-metadata.entity';

@Injectable()
export class MetadataDocumentsService {
  constructor(
    @InjectRepository(DocumentMetadata)
    private readonly documentsRepository: Repository<DocumentMetadata>,
  ) {}

  findAllByOwner(ownerId: string): Promise<DocumentMetadata[]> {
    return this.documentsRepository.find({
      where: { ownerId },
      order: { updatedAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<DocumentMetadata> {
    const found = await this.documentsRepository.findOne({ where: { id } });
    if (!found)
      throw new NotFoundException(`Documento con ID ${id} no encontrado`);
    return found;
  }

  async clone(dto: CloneDocumentDto): Promise<DocumentMetadata> {
    const created = this.documentsRepository.create({
      ownerId: dto.owner_id,
      templateId: dto.template_id,
    });
    return this.documentsRepository.save(created);
  }

  async publish(dto: PublishDocumentDto): Promise<DocumentMetadata> {
    const doc = await this.findById(dto.id);
    await this.documentsRepository.update(doc.id, {}); // touch last_update
    return { ...doc, updatedAt: new Date() };
  }

  async save(id: string, dto: SaveDocumentDto): Promise<DocumentMetadata> {
    const doc = await this.findById(id);
    await this.documentsRepository.update(doc.id, {
      content: dto.content ?? undefined,
    });
    return this.findById(id);
  }
}
