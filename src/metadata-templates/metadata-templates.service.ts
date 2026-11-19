import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetadataTemplateDto } from './dto/create-metadata-template.dto';
import { MetadataTemplatePage } from './dto/metadata-template-page.dto';
import { UpdateMetadataTemplateDto } from './dto/update-metadata-template.dto';
import { TemplateMetadata } from './entities/template-metadata.entity';

@Injectable()
export class MetadataTemplatesService {
  constructor(
    @InjectRepository(TemplateMetadata)
    private readonly templatesRepository: Repository<TemplateMetadata>,
  ) {}

  async findAll(page: number, limit: number): Promise<MetadataTemplatePage> {
    const [data, total] = await this.templatesRepository.findAndCount({
      order: { dateCreation: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, page, limit, total };
  }

  async findById(id: string): Promise<TemplateMetadata> {
    const found = await this.templatesRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Plantilla con ID ${id} no encontrada`);
    }
    return found;
  }

  create(dto: CreateMetadataTemplateDto): Promise<TemplateMetadata> {
    return this.templatesRepository.save(
      this.templatesRepository.create({
        name: dto.name,
        subject: dto.subject,
        statusTemplate: dto.statusTemplate ?? true,
        creatorId: dto.creatorId,
      }),
    );
  }

  async update(
    id: string,
    dto: UpdateMetadataTemplateDto,
  ): Promise<TemplateMetadata> {
    const template = await this.findById(id);
    await this.templatesRepository.update(template.id, { name: dto.name });
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    const template = await this.findById(id);
    await this.templatesRepository.delete(template.id);
  }
}
