import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateCustomerCommand } from './commands/create-customer.command';
import { UpdateCustomerCommand } from './commands/update-customer.command';
import { DeleteCustomerCommand } from './commands/delete-customer.command';
import { GetCustomerQuery } from './queries/get-customer.query';
import { GetCustomersQuery } from './queries/get-customers.query';

@Injectable()
export class CustomerService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod('CustomerService', 'CreateCustomer')
  async createCustomer(data: any) {
    const { name, phone, address } = data;
    const customer = await this.commandBus.execute(
      new CreateCustomerCommand(name, phone, address),
    );
    return { customer_id: customer.customer_id, name: customer.name, phone: customer.phone, address: customer.address };
  }

  @GrpcMethod('CustomerService', 'UpdateCustomer')
  async updateCustomer(data: any) {
    const { customer_id, name, phone, address } = data;
    const customer = await this.commandBus.execute(
      new UpdateCustomerCommand(customer_id, name, phone, address),
    );
    return { customer_id: customer.customer_id, name: customer.name, phone: customer.phone, address: customer.address };
  }

  @GrpcMethod('CustomerService', 'DeleteCustomer')
  async deleteCustomer(data: any) {
    const { customer_id } = data;
    await this.commandBus.execute(new DeleteCustomerCommand(customer_id));
    return { success: true };
  }

  @GrpcMethod('CustomerService', 'GetCustomer')
  async getCustomer(data: any) {
    const { customer_id } = data;
    const customer = await this.queryBus.execute(new GetCustomerQuery(customer_id));
    return { customer_id: customer.customer_id, name: customer.name, phone: customer.phone, address: customer.address };
  }

  @GrpcMethod('CustomerService', 'GetCustomers')
  async getCustomers() {
    const customers = await this.queryBus.execute(new GetCustomersQuery());
    return { customers };
  }
}
