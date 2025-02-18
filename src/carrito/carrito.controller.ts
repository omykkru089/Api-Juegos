import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CarritoService } from './carrito.service';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post()
  async addToCarrito(
    @Body('pedido') id_pedido: number,
    @Body('juegoId') juego_Identificador: number,
    @Body('cantidad') cantidad: number,
  ) {
    return this.carritoService.addToCarrito(id_pedido, juego_Identificador, cantidad);
  }

  @Get(':id')
  async getCarrito(@Param('id') id: number) {
    return this.carritoService.getCarritoByPedido(id);
  }

  @Delete(':id')
  async removeFromCarrito(@Param('id') id: number) {
    return this.carritoService.removeFromCarrito(id);
  }

  @Delete('clear/:id')
  async clearCarrito(@Param('id') id: number) {
    return this.carritoService.clearCarrito(id);
  }
}
