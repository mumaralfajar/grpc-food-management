import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateFoodHandler } from './handlers/create-food.handler';
import { UpdateFoodHandler } from './handlers/update-food.handler';
import { DeleteFoodHandler } from './handlers/delete-food.handler';
import { GetFoodHandler } from './handlers/get-food.handler';
import { GetFoodsHandler } from './handlers/get-foods.handler';
import { FoodsController } from './food.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { FoodService } from './food.service';
import { Foods } from './food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Foods]), CqrsModule],
  controllers: [FoodsController],
  providers: [
    CreateFoodHandler,
    UpdateFoodHandler,
    DeleteFoodHandler,
    GetFoodHandler,
    GetFoodsHandler,
    FoodService,
  ],
})
export class FoodsModule {}
