import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateTransactionCommand } from './commands/create-transaction.command';
import { UpdateTransactionCommand } from './commands/update-transaction.command';
import { DeleteTransactionCommand } from './commands/delete-transaction.command';
import { GetTransactionQuery } from './queries/get-transaction.query';
import { GetTransactionsQuery } from './queries/get-transactions.query';

@Injectable()
export class TransactionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('TransactionService', 'CreateTransaction')
  async createTransaction(data: any) {
    const { customer_id, food_id, qty } = data;
    const transaction = await this.commandBus.execute(
      new CreateTransactionCommand(customer_id, food_id, qty),
    );
    return {
      transaction_id: transaction.transaction_id,
      customer_id: transaction.customer.customer_id,
      food_id: transaction.food.food_id,
      qty: transaction.qty,
      total_price: transaction.total_price,
      transaction_date: transaction.transaction_date,
    };
  }

  @GrpcMethod('TransactionService', 'UpdateTransaction')
  async updateTransaction(data: any) {
    const { transaction_id, customer_id, food_id, qty } = data;
    const transaction = await this.commandBus.execute(
      new UpdateTransactionCommand(transaction_id, customer_id, food_id, qty),
    );
    return {
      transaction_id: transaction.transaction_id,
      customer_id: transaction.customer.customer_id,
      food_id: transaction.food.food_id,
      qty: transaction.qty,
      total_price: transaction.total_price,
      transaction_date: transaction.transaction_date,
    };
  }

  @GrpcMethod('TransactionService', 'DeleteTransaction')
  async deleteTransaction(data: any) {
    const { transaction_id } = data;
    await this.commandBus.execute(new DeleteTransactionCommand(transaction_id));
    return { success: true };
  }

  @GrpcMethod('TransactionService', 'GetTransaction')
  async getTransaction(data: any) {
    const { transaction_id } = data;
    const transaction = await this.queryBus.execute(
      new GetTransactionQuery(transaction_id),
    );
    return {
      transaction_id: transaction.transaction_id,
      customer_id: transaction.customer.customer_id,
      food_id: transaction.food.food_id,
      qty: transaction.qty,
      total_price: transaction.total_price,
      transaction_date: transaction.transaction_date,
    };
  }

  @GrpcMethod('TransactionService', 'GetTransactions')
  async getTransactions() {
    const transactions = await this.queryBus.execute(
      new GetTransactionsQuery(),
    );
    return { transactions };
  }
}
