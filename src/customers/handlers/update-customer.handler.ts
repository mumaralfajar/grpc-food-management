import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCustomerCommand } from '../commands/update-customer.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../customer.entity';
import { Repository } from 'typeorm';

@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler
  implements ICommandHandler<UpdateCustomerCommand>
{
  constructor(
    @InjectRepository(Customers)
    private readonly repository: Repository<Customers>,
  ) {}

  async execute(command: UpdateCustomerCommand) {
    const { customer_id, name, phone, address } = command;
    const customer = await this.repository.findOne({ where: { customer_id } });

    if (!customer) {
      throw new Error('Customer not found');
    }

    customer.name = name;
    customer.phone = phone;
    customer.address = address;

    return this.repository.save(customer);
  }
}
