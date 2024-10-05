import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCustomerCommand } from '../commands/delete-customer.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from '../customer.entity';
import { Repository } from 'typeorm';

@CommandHandler(DeleteCustomerCommand)
export class DeleteCustomerHandler
  implements ICommandHandler<DeleteCustomerCommand>
{
  constructor(
    @InjectRepository(Customers)
    private readonly repository: Repository<Customers>,
  ) {}

  async execute(command: DeleteCustomerCommand) {
    const { customer_id } = command;
    const customer = await this.repository.findOne({ where: { customer_id } });

    if (!customer) {
      throw new Error('Customer not found');
    }

    return this.repository.delete(customer_id);
  }
}
