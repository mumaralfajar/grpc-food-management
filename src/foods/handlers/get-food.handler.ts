import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFoodQuery } from '../queries/get-food.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Foods } from '../food.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetFoodQuery)
export class GetFoodHandler implements IQueryHandler<GetFoodQuery> {
  constructor(
    @InjectRepository(Foods) private readonly repository: Repository<Foods>,
  ) {}

  async execute(query: GetFoodQuery) {
    const { food_id } = query;
    return this.repository.findOne({ where: { food_id } });
  }
}
