import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateFoodCommand } from '../commands/update-food.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Foods } from '../food.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateFoodCommand)
export class UpdateFoodHandler implements ICommandHandler<UpdateFoodCommand> {
  constructor(
    @InjectRepository(Foods) private readonly repository: Repository<Foods>,
  ) {}

  async execute(command: UpdateFoodCommand) {
    const { food_id, food_name, price, stock } = command;
    const food = await this.repository.findOne({ where: { food_id } });

    if (!food) {
      throw new Error('Food not found');
    }

    food.food_name = food_name;
    food.price = price;
    food.stock = stock;

    return this.repository.save(food);
  }
}
