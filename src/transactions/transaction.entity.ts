import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customers } from '../customers/customer.entity';
import { Foods } from '../foods/food.entity';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @ManyToOne(() => Customers, (customer) => customer.customer_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customers;

  @ManyToOne(() => Foods, (food) => food.food_id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'food_id' })
  food: Foods;

  @Column()
  qty: number;

  @Column()
  total_price: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  transaction_date: Date;
}
