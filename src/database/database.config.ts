import type { DataSourceOptions } from 'typeorm';
import { Init1760000000000 } from './migrations/1760000000000-Init';
import { AddDocumentContent1761000000000 } from './migrations/1761000000000-AddDocumentContent';

export const dbOptions = (get: (key: string) => string): DataSourceOptions => ({
  type: 'postgres',
  host: get('POSTGRES_HOST'),
  port: Number(get('POSTGRES_PORT')),
  username: get('POSTGRES_USER'),
  password: get('POSTGRES_PASSWORD'),
  database: get('POSTGRES_DB'),
  migrations: [Init1760000000000, AddDocumentContent1761000000000],
});
