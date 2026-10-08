import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role {
  DIRECTOR = 'director',
  COORDINATOR = 'coordinator',
  AREA_LEADER = 'area_leader',
  TEACHER = 'teacher',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ name: 'last_name', length: 100 })
  lastName: string;

  @Column({ length: 160, unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255, select: false })
  passwordHash: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  // ponytail: plain column until the area module adds the foreign key
  @Column({ name: 'area_id', type: 'int', nullable: true })
  areaId: number | null;

  // ponytail: plain column until the institution module adds the foreign key
  @Column({ name: 'institution_id', type: 'int', nullable: true })
  institutionId: number | null;

  @Column({ name: 'reset_token_hash', type: 'varchar', length: 64, nullable: true, select: false })
  resetTokenHash: string | null;

  @Column({ name: 'reset_token_expires_at', type: 'timestamp', nullable: true, select: false })
  resetTokenExpiresAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
