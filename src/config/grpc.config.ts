import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

export const grpcConfig: MicroserviceOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['food', 'customer', 'transaction'],
    protoPath: [
      join(__dirname, '../proto/food.proto'),
      join(__dirname, '../proto/customer.proto'),
      join(__dirname, '../proto/transaction.proto'),
    ],
  },
};
