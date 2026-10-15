// CLI entry for migrations: npm run migration:run
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { dbOptions } from './database.config';

export default new DataSource(dbOptions((key) => process.env[key] as string));
