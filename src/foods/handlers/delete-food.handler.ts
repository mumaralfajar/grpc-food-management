import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFoodCommand } from '../commands/delete-food.command';
import { Repository } from 'typeorm';
import { Foods } from '../food.entity';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteFoodCommand)
export class DeleteFoodHandler implements ICommandHandler<DeleteFoodCommand> {
  constructor(
    @InjectRepository(Foods) private readonly repository: Repository<Foods>,
  ) {}

  async execute(command: DeleteFoodCommand) {
    const { food_id } = command;
    const food = await this.repository.findOne({ where: { food_id } });

    if (!food) {
      throw new Error('Food not found');
    }

    return this.repository.delete(food_id);
  }
}
