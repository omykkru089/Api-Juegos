import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PedidosService } from './pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async addToPedido(
    @Body('userId') userId: number,
    @Body('fecha_creacion') fecha_creacion: Date,
    @Body('estado') estado: string,
  ) {
    return this.pedidosService.addToPedido(userId, fecha_creacion, estado);
  }

  @Get(':userId')
  async getPedido(@Param('userId') userId: number) {
    return this.pedidosService.getPedidoByUser(userId);
  }

  @Delete(':userId')
  async removeFromPedido(@Param('userId') userId: number) {
    return this.pedidosService.removeFromPedido(userId);
  }

  @Delete('clear/:userId')
  async clearPedido(@Param('userId') userId: number) {
    return this.pedidosService.clearPedido(userId);
  }
}
