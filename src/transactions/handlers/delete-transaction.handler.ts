import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTransactionCommand } from '../commands/delete-transaction.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from '../transaction.entity';
import { Repository } from 'typeorm';

@CommandHandler(DeleteTransactionCommand)
export class DeleteTransactionHandler
  implements ICommandHandler<DeleteTransactionCommand>
{
  constructor(
    @InjectRepository(Transactions)
    private readonly repository: Repository<Transactions>,
  ) {}

  async execute(command: DeleteTransactionCommand) {
    return this.repository.delete(command.transaction_id);
  }
}
