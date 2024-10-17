import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { Carrito } from './entities/carrito.entity';
import { Juego } from '../juegos/entities/juego.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, Juego, User])],
  providers: [CarritoService],
  controllers: [CarritoController],
})
export class CarritoModule {}
