import {NestFactory, Reflector} from '@nestjs/core';
import { AppModule } from './app.module';
import {ClassSerializerInterceptor, ValidationPipe} from "@nestjs/common";
import {GatewayAdapter} from "./gateway/gateway.adapter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      }
    ));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));

  const adapter=new GatewayAdapter(app);
  app.useWebSocketAdapter(adapter);
  await app.listen(3000);
}
bootstrap();
