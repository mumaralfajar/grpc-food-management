import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTransactionsQuery } from '../queries/get-transactions.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from '../transaction.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetTransactionsQuery)
export class GetTransactionsHandler
  implements IQueryHandler<GetTransactionsQuery>
{
  constructor(
    @InjectRepository(Transactions)
    private readonly repository: Repository<Transactions>,
  ) {}

  async execute() {
    return this.repository.find();
  }
}
