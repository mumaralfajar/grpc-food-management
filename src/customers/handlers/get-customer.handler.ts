import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerQuery } from '../queries/get-customer.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../customer.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler implements IQueryHandler<GetCustomerQuery> {
  constructor(
    @InjectRepository(Customers)
    private readonly repository: Repository<Customers>,
  ) {}

  async execute(query: GetCustomerQuery) {
    const { customer_id } = query;
    return this.repository.findOne({ where: { customer_id } });
  }
}
