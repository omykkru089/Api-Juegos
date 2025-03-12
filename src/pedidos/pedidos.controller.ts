import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  @Auth(Role.USER)
  async addToPedido(
    @Body('userId') userId: number,
    @Body('fecha_creacion') fecha_creacion: Date,
    @Body('estado') estado: string,
  ) {
    return this.pedidosService.addToPedido(userId, fecha_creacion, estado);
  }

  @Get(':userId')
  @Auth(Role.USER)
  async getPedido(@Param('userId') userId: number) {
    return this.pedidosService.getPedidoByUser(userId);
  }

  @Delete(':userId')
  @Auth(Role.USER)
  async removeFromPedido(@Param('userId') id:number, userId: number) {
    return this.pedidosService.removeFromPedido(id, userId);
  }

  @Delete('clear/:userId')
  @Auth(Role.USER)
  async clearPedido(@Param('userId') userId: number) {
    return this.pedidosService.clearPedido(userId);
  }
}
