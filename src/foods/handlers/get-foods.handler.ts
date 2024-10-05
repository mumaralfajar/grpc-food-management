import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFoodsQuery } from '../queries/get-foods.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Foods } from '../food.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetFoodsQuery)
export class GetFoodsHandler implements IQueryHandler<GetFoodsQuery> {
  constructor(
    @InjectRepository(Foods) private readonly repository: Repository<Foods>,
  ) {}

  async execute() {
    return this.repository.find();
  }
}
