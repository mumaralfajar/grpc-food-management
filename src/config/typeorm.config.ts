import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Customers } from '../customers/customer.entity';
import { Foods } from '../foods/food.entity';
import { Transactions } from '../transactions/transaction.entity';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: parseInt(configService.get('DB_PORT', '5432')),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [Customers, Foods, Transactions],
  synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
});
