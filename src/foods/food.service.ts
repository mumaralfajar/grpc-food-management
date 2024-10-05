import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateFoodCommand } from './commands/create-food.command';
import { UpdateFoodCommand } from './commands/update-food.command';
import { DeleteFoodCommand } from './commands/delete-food.command';
import { GetFoodQuery } from './queries/get-food.query';
import { GetFoodsQuery } from './queries/get-foods.query';

@Injectable()
export class FoodService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('FoodService', 'CreateFood')
  async createFood(data: any) {
    const { food_name, price, stock } = data;
    const food = await this.commandBus.execute(
      new CreateFoodCommand(food_name, price, stock),
    );
    return { food_id: food.food_id, food_name: food.food_name, price: food.price, stock: food.stock };
  }

  @GrpcMethod('FoodService', 'UpdateFood')
  async updateFood(data: any) {
    const { food_id, food_name, price, stock } = data;
    const food = await this.commandBus.execute(
      new UpdateFoodCommand(food_id, food_name, price, stock),
    );
    return { food_id: food.food_id, food_name: food.food_name, price: food.price, stock: food.stock };
  }

  @GrpcMethod('FoodService', 'DeleteFood')
  async deleteFood(data: any) {
    const { food_id } = data;
    await this.commandBus.execute(new DeleteFoodCommand(food_id));
    return { success: true };
  }

  @GrpcMethod('FoodService', 'GetFood')
  async getFood(data: any) {
    const { food_id } = data;
    const food = await this.queryBus.execute(new GetFoodQuery(food_id));
    return { food_id: food.food_id, food_name: food.food_name, price: food.price, stock: food.stock };
  }

  @GrpcMethod('FoodService', 'GetFoods')
  async getFoods() {
    const foods = await this.queryBus.execute(new GetFoodsQuery());
    return { foods };
  }
}
