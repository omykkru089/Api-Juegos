import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CarritoService } from './carrito.service';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post()
  async addToCarrito(
    @Body('userId') userId: number,
    @Body('juegoId') juegoId: number,
    @Body('cantidad') cantidad: number,
  ) {
    return this.carritoService.addToCarrito(userId, juegoId, cantidad);
  }

  @Get(':userId')
  async getCarrito(@Param('userId') userId: number) {
    return this.carritoService.getCarritoByUser(userId);
  }

  @Delete(':id')
  async removeFromCarrito(@Param('id') id: number) {
    return this.carritoService.removeFromCarrito(id);
  }

  @Delete('clear/:userId')
  async clearCarrito(@Param('userId') userId: number) {
    return this.carritoService.clearCarrito(userId);
  }
}
