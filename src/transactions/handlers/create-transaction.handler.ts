import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '../commands/create-transaction.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactions } from '../transaction.entity';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(
    @InjectRepository(Transactions)
    private readonly repository: Repository<Transactions>,
  ) {}

  async execute(command: CreateTransactionCommand) {
    const { customer_id, food_id, qty } = command;

    const transaction = this.repository.create({
      customer: { customer_id },
      food: { food_id },
      qty,
      total_price: 0,
    });

    return this.repository.save(transaction);
  }
}
