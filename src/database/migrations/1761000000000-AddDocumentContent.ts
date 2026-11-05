import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDocumentContent1761000000000 implements MigrationInterface {
  name = 'AddDocumentContent1761000000000';

  async up(q: QueryRunner): Promise<void> {
    await q.query(`ALTER TABLE "DocumentMetadata" ADD COLUMN "content" text`);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(`ALTER TABLE "DocumentMetadata" DROP COLUMN "content"`);
  }
}
