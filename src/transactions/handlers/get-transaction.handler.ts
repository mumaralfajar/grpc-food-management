import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetTransactionQuery } from '../queries/get-transaction.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from '../transaction.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetTransactionQuery)
export class GetTransactionHandler
  implements IQueryHandler<GetTransactionQuery>
{
  constructor(
    @InjectRepository(Transactions)
    private readonly repository: Repository<Transactions>,
  ) {}

  async execute(query: GetTransactionQuery) {
    return this.repository.findOne({
      where: { transaction_id: query.transaction_id },
    });
  }
}
