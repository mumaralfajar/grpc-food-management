import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTransactionCommand } from '../commands/update-transaction.command';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from '../transaction.entity';
import { Customers } from '../../customers/customer.entity';
import { Foods } from '../../foods/food.entity';

@CommandHandler(UpdateTransactionCommand)
export class UpdateTransactionHandler
  implements ICommandHandler<UpdateTransactionCommand>
{
  constructor(
    @InjectRepository(Transactions)
    private readonly transactionsRepository: Repository<Transactions>,

    @InjectRepository(Customers)
    private readonly customersRepository: Repository<Customers>,

    @InjectRepository(Foods)
    private readonly foodsRepository: Repository<Foods>,
  ) {}

  async execute(command: UpdateTransactionCommand) {
    const { transaction_id, customer_id, food_id, qty } = command;

    const transaction = await this.transactionsRepository.findOne({
      where: { transaction_id },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const customer = await this.customersRepository.findOne({
      where: { customer_id },
    });
    const food = await this.foodsRepository.findOne({ where: { food_id } });

    if (!customer) {
      throw new Error('Customer not found');
    }

    if (!food) {
      throw new Error('Food not found');
    }

    transaction.customer = customer;
    transaction.food = food;
    transaction.qty = qty;

    return this.transactionsRepository.save(transaction);
  }
}
