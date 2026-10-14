import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import {
  CreateMetadataTemplateDto,
  MetadataTemplatePage,
  MetadataTemplateResponse,
  UpdateMetadataTemplateDto,
} from './metadata-templates.dto';

@Injectable()
export class MetadataTemplatesService {
  
  private templates: MetadataTemplateResponse[] = ['Tesis', 'Articulo', 'Informe'].map(
    (name) => {
      const now = new Date().toISOString();
      return {
        id: randomUUID(),
        name,
        subject: `Plantilla de ${name}`,
        status: true,
        createdAt: now,
        updatedAt: now,
        ownerId: randomUUID(),
      };
    },
  );

  findAll(page: number, limit: number): MetadataTemplatePage {
    const start = (page - 1) * limit;
    return {
      data: this.templates.slice(start, start + limit),
      page,
      limit,
      total: this.templates.length,
    };
  }

  findById(id: string): MetadataTemplateResponse {
    const template = this.templates.find((t) => t.id === id);
    if (!template) throw new NotFoundException('Metadata template not found');
    return template;
  }

  create(dto: CreateMetadataTemplateDto): MetadataTemplateResponse {
    const now = new Date().toISOString();
    const template: MetadataTemplateResponse = {
      id: randomUUID(),
      name: dto.name,
      subject: dto.subject,
      status: dto.status ?? true,
      createdAt: now,
      updatedAt: now,
      ownerId: dto.ownerId,
    };
    this.templates.push(template);
    return template;
  }

  update(id: string, dto: UpdateMetadataTemplateDto): MetadataTemplateResponse {
    const template = this.findById(id);
    template.name = dto.name;
    template.updatedAt = new Date().toISOString();
    return template;
  }

  remove(id: string): void {
    this.templates.splice(this.templates.indexOf(this.findById(id)), 1);
  }
}
