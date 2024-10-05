import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomersQuery } from '../queries/get-customers.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../customer.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  constructor(
    @InjectRepository(Customers)
    private readonly repository: Repository<Customers>,
  ) {}

  async execute() {
    return this.repository.find();
  }
}
