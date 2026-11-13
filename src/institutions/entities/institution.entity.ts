import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('institution')
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;
}
