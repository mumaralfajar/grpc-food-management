import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from './transaction.entity';
import { Customers } from '../customers/customer.entity';
import { Foods } from '../foods/food.entity';
import { UpdateTransactionHandler } from './handlers/update-transaction.handler';
import { TransactionService } from './transaction.service';
import { GetTransactionsHandler } from './handlers/get-transactions.handler';
import { GetTransactionHandler } from './handlers/get-transaction.handler';
import { DeleteTransactionHandler } from './handlers/delete-transaction.handler';
import { CreateTransactionHandler } from './handlers/create-transaction.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transactions, Customers, Foods]),
    CqrsModule,
  ],
  providers: [
    CreateTransactionHandler,
    UpdateTransactionHandler,
    DeleteTransactionHandler,
    GetTransactionHandler,
    GetTransactionsHandler,
    TransactionService,
  ],
})
export class TransactionsModule {}
