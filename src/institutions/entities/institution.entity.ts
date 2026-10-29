import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Institution')
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  name: string;
}
