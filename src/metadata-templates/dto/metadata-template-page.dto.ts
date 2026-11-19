import { TemplateMetadata } from '../entities/template-metadata.entity';

export interface MetadataTemplatePage {
  data: TemplateMetadata[];
  page: number;
  limit: number;
  total: number;
}
