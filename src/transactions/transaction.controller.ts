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
import { CreateTransactionCommand } from './commands/create-transaction.command';
import { UpdateTransactionCommand } from './commands/update-transaction.command';
import { DeleteTransactionCommand } from './commands/delete-transaction.command';
import { GetTransactionQuery } from './queries/get-transaction.query';
import { GetTransactionsQuery } from './queries/get-transactions.query';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createTransaction(@Body() body: any) {
    const { customer_id, food_id, qty } = body;
    return this.commandBus.execute(
      new CreateTransactionCommand(customer_id, food_id, qty),
    );
  }

  @Put(':id')
  async updateTransaction(@Param('id') id: number, @Body() body: any) {
    const { customer_id, food_id, qty } = body;
    return this.commandBus.execute(
      new UpdateTransactionCommand(id, customer_id, food_id, qty),
    );
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteTransactionCommand(id));
  }

  @Get()
  async getAllTransactions() {
    return this.queryBus.execute(new GetTransactionsQuery());
  }

  @Get(':id')
  async getTransaction(@Param('id') id: number) {
    return this.queryBus.execute(new GetTransactionQuery(id));
  }
}
