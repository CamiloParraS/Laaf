import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1760000000000 implements MigrationInterface {
  name = 'Init1760000000000';

  async up(q: QueryRunner): Promise<void> {
    await q.query(`CREATE TYPE "Role" AS ENUM ('TEACHER', 'CORDINATOR', 'DIRECTOR')`);
    await q.query(`CREATE TABLE "Institution" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL UNIQUE)`);
    await q.query(`CREATE TABLE "Area" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL UNIQUE,
      "institutionId" uuid NOT NULL REFERENCES "Institution"("id"),
      "areaLeaderId" uuid)`);
    await q.query(`CREATE TABLE "User" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL,
      "lastname" text NOT NULL,
      "email" text NOT NULL UNIQUE,
      "password" text NOT NULL,
      "last_login" timestamptz NOT NULL DEFAULT now(),
      "createdAt" timestamptz NOT NULL DEFAULT now(),
      "updatedAt" timestamptz NOT NULL DEFAULT now(),
      "role" "Role" NOT NULL,
      "institutionId" uuid NOT NULL REFERENCES "Institution"("id"),
      "areaId" uuid NOT NULL REFERENCES "Area"("id"))`);
    await q.query(`ALTER TABLE "Area" ADD FOREIGN KEY ("areaLeaderId") REFERENCES "User"("id") ON DELETE SET NULL`);
    await q.query(`CREATE TABLE "TemplateMetadata" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL,
      "subject" text NOT NULL,
      "status" boolean NOT NULL DEFAULT false,
      "createdAt" timestamptz NOT NULL DEFAULT now(),
      "updatedAt" timestamptz NOT NULL DEFAULT now(),
      "ownerId" uuid NOT NULL REFERENCES "User"("id"))`);
    await q.query(`CREATE TABLE "DocumentMetadata" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "createdAt" timestamptz NOT NULL DEFAULT now(),
      "updatedAt" timestamptz NOT NULL DEFAULT now(),
      "ownerId" uuid NOT NULL REFERENCES "User"("id"),
      "templateId" uuid NOT NULL REFERENCES "TemplateMetadata"("id"))`);
  }

  async down(q: QueryRunner): Promise<void> {
    for (const t of ['DocumentMetadata', 'TemplateMetadata', 'User', 'Area', 'Institution']) {
      await q.query(`DROP TABLE "${t}" CASCADE`);
    }
    await q.query(`DROP TYPE "Role"`);
  }
}
