import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCustomerHandler } from './handlers/create-customer.handler';
import { UpdateCustomerHandler } from './handlers/update-customer.handler';
import { DeleteCustomerHandler } from './handlers/delete-customer.handler';
import { GetCustomerHandler } from './handlers/get-customer.handler';
import { GetCustomersHandler } from './handlers/get-customers.handler';
import { CustomersController } from './customer.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { CustomerService } from './customer.service';
import { Customers } from './customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customers]), CqrsModule],
  controllers: [CustomersController],
  providers: [
    CreateCustomerHandler,
    UpdateCustomerHandler,
    DeleteCustomerHandler,
    GetCustomerHandler,
    GetCustomersHandler,
    CustomerService,
  ],
})
export class CustomersModule {}
