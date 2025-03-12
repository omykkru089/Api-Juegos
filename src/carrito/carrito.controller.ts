import { Controller, Post, Body, Get, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { Auth } from 'src/auth/Decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post()
@UseGuards(AuthGuard)
async addToCarrito(
  @Req() req,
  @Body('pedidoId') pedidoId: number,
  @Body('juegoId') juegoId: number,
  @Body('cantidad') cantidad: number
) {
  const userId = req.user.id; // Asume que el ID del usuario está en req.user.id
  return this.carritoService.addToCarrito(userId, pedidoId, juegoId, cantidad);
}

  @Get(':pedidoId')
  @Auth(Role.USER)
  async getCarrito(@Param('id') pedidoId: number, userId: number) {
    return this.carritoService.getCarritoByPedido(pedidoId, userId);
  }

  @Delete(':id')
  @Auth(Role.USER)
  async removeFromCarrito(@Param('id') id: number, userId: number) {
    return this.carritoService.removeFromCarrito(id, userId);
  }

  @Delete('clear/:id')
  @Auth(Role.USER)
  async clearCarrito(@Param('id') id: number) {
    return this.carritoService.clearCarrito(id);
  }
}
