import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';

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
  @UseGuards(AuthGuard)
  async getPedidos(@Param('userId') userId: number) {
    return this.pedidosService.getPedidosByUser(userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deletePedido(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;
    return this.pedidosService.deletePedido(id, userId);
  }
}
