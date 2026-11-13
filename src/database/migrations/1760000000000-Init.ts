import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1760000000000 implements MigrationInterface {
  name = 'Init1760000000000';

  async up(q: QueryRunner): Promise<void> {
    await q.query(`CREATE TYPE "Role" AS ENUM ('TEACHER', 'CORDINATOR', 'DIRECTOR')`);
    await q.query(`CREATE TABLE "institution" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL UNIQUE)`);
    await q.query(`CREATE TABLE "area" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL UNIQUE,
      "institution_id" uuid NOT NULL REFERENCES "institution"("id"),
      "leader_id" uuid)`);
    await q.query(`CREATE TABLE "users" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL,
      "last_name" text NOT NULL,
      "email" text NOT NULL UNIQUE,
      "password" text NOT NULL,
      "last_login" timestamptz NOT NULL DEFAULT now(),
      "date_register" timestamptz NOT NULL DEFAULT now(),
      "last_update" timestamptz NOT NULL DEFAULT now(),
      "role" "Role" NOT NULL,
      "institution_id" uuid NOT NULL REFERENCES "institution"("id"),
      "area_id" uuid NOT NULL REFERENCES "area"("id"))`);
    await q.query(`ALTER TABLE "area" ADD FOREIGN KEY ("leader_id") REFERENCES "users"("id") ON DELETE SET NULL`);
    await q.query(`CREATE TABLE "template_metadata" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL,
      "subject" text NOT NULL,
      "status_template" boolean NOT NULL DEFAULT false,
      "date_creation" timestamptz NOT NULL DEFAULT now(),
      "last_update" timestamptz NOT NULL DEFAULT now(),
      "creator_id" uuid NOT NULL REFERENCES "users"("id"))`);
    await q.query(`CREATE TABLE "document_metadata" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "date_clone" timestamptz NOT NULL DEFAULT now(),
      "last_update" timestamptz NOT NULL DEFAULT now(),
      "owner_id" uuid NOT NULL REFERENCES "users"("id"),
      "template_id" uuid NOT NULL REFERENCES "template_metadata"("id"))`);
  }

  async down(q: QueryRunner): Promise<void> {
    for (const t of ['document_metadata', 'template_metadata', 'users', 'area', 'institution']) {
      await q.query(`DROP TABLE "${t}" CASCADE`);
    }
    await q.query(`DROP TYPE "Role"`);
  }
}
