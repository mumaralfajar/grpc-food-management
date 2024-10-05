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
import { CreateCustomerCommand } from './commands/create-customer.command';
import { UpdateCustomerCommand } from './commands/update-customer.command';
import { DeleteCustomerCommand } from './commands/delete-customer.command';
import { GetCustomerQuery } from './queries/get-customer.query';
import { GetCustomersQuery } from './queries/get-customers.query';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createCustomer(@Body() body: any) {
    const { name, phone, address } = body;
    return this.commandBus.execute(
      new CreateCustomerCommand(name, phone, address),
    );
  }

  @Put(':id')
  async updateCustomer(@Param('id') id: number, @Body() body: any) {
    const { name, phone, address } = body;
    return this.commandBus.execute(
      new UpdateCustomerCommand(id, name, phone, address),
    );
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number) {
    return this.commandBus.execute(new DeleteCustomerCommand(id));
  }

  @Get()
  async getAllCustomers() {
    return this.queryBus.execute(new GetCustomersQuery());
  }

  @Get(':id')
  async getCustomer(@Param('id') id: number) {
    return this.queryBus.execute(new GetCustomerQuery(id));
  }
}
