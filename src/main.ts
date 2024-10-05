import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { grpcConfig } from './config/grpc.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup gRPC server
  app.connectMicroservice(grpcConfig);

  // Start both HTTP and gRPC servers
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
