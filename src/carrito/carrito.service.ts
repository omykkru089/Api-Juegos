import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { Juego } from '../juegos/entities/juego.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private carritoRepository: Repository<Carrito>,
  ) {}

  async addToCarrito(userId: number, juegoId: number, cantidad: number) {
    const carritoItem = new Carrito();
    carritoItem.user = { id: userId } as User;  // Creas el usuario por ID
    carritoItem.juego = { id: juegoId } as Juego; // Creas el juego por ID
    carritoItem.cantidad = cantidad;
    return this.carritoRepository.save(carritoItem);
  }

  async getCarritoByUser(userId: number) {
    return this.carritoRepository.find({ where: { user: { id: userId } }, relations: ['juego'] });
  }

  async removeFromCarrito(id: number) {
    return this.carritoRepository.delete(id);
  }

  async clearCarrito(userId: number) {
    return this.carritoRepository.delete({ user: { id: userId } });
  }
}
