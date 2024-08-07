import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Esto es una forma de separar nuestra api de la url que tenemos, "http://localhost:3000/api"
app.setGlobalPrefix("api")

// esto hace que configuremos de forma global haga las validaciones de los datos de entradas
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  })
);

  await app.listen(3000);
}
bootstrap();
