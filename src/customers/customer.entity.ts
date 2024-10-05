import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customers {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;
}
