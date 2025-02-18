import { forwardRef, Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { Pedido } from './entities/pedido.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CarritoModule } from 'src/carrito/carrito.module';

@Module({
  controllers: [PedidosController],
  providers: [PedidosService],
  imports: [TypeOrmModule.forFeature([Pedido]), 
  forwardRef(() => UsersModule),
  forwardRef(() => CarritoModule)],
  exports: [TypeOrmModule, PedidosService]
})
export class PedidosModule {}
