import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateFoodCommand } from './commands/create-food.command';
import { UpdateFoodCommand } from './commands/update-food.command';
import { DeleteFoodCommand } from './commands/delete-food.command';
import { GetFoodQuery } from './queries/get-food.query';
import { GetFoodsQuery } from './queries/get-foods.query';

@Controller('foods')
export class FoodsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createFood(@Body() body: any) {
    const { food_name, price, stock } = body;
    return this.commandBus.execute(
      new CreateFoodCommand(food_name, price, stock),
    );
  }

  @Put(':id')
  async updateFood(@Param('id') id: number, @Body() body: any) {
    const { food_name, price, stock } = body;
    return this.commandBus.execute(
      new UpdateFoodCommand(id, food_name, price, stock),
    );
  }

  @Delete(':id')
  async deleteFood(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteFoodCommand(id));
  }

  @Get()
  async getAllFoods() {
    return this.queryBus.execute(new GetFoodsQuery());
  }

  @Get(':id')
  async getFood(@Param('id') id: number) {
    return this.queryBus.execute(new GetFoodQuery(id));
  }
}
