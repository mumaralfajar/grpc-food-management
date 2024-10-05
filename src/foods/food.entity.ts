import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Foods {
  @PrimaryGeneratedColumn()
  food_id: number;

  @Column()
  food_name: string;

  @Column()
  price: number;

  @Column()
  stock: number;
}
