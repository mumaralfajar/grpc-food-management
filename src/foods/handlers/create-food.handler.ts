import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFoodCommand } from '../commands/create-food.command';
import { Repository } from 'typeorm';
import { Foods } from '../food.entity';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateFoodCommand)
export class CreateFoodHandler implements ICommandHandler<CreateFoodCommand> {
  constructor(
    @InjectRepository(Foods) private readonly repository: Repository<Foods>,
  ) {}

  async execute(command: CreateFoodCommand) {
    const { food_name, price, stock } = command;

    const food = this.repository.create({
      food_name,
      price,
      stock,
    });

    return this.repository.save(food);
  }
}
