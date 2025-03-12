import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { Juego } from '../juegos/entities/juego.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
    @InjectRepository(Juego)
        private readonly juegoRepository: Repository<Juego>,
    @InjectRepository(Pedido)
      private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async addToCarrito(userId: number, pedidoId: number, juegoId: number, cantidad: number) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: pedidoId, user: { id: userId } },
      relations: ['user']
    });
  
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado o no pertenece al usuario');
    }
  
    const juego = await this.juegoRepository.findOne({ where: { id: juegoId } });
    if (!juego) {
      throw new NotFoundException('Juego no encontrado');
    }
  
    const carritoItem = this.carritoRepository.create({
      pedido,
      juego,
      cantidad
    });
  
    return this.carritoRepository.save(carritoItem);
  }

  async getCarritoByPedido(pedidoId: number, userId: number) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id: pedidoId, user: { id: userId } },
    });
    if (!pedido) {
      throw new NotFoundException('Pedido no encontrado');
    }
    return this.carritoRepository.find({
      where: { pedido: { id: pedidoId } },
      relations: ['pedido', 'juego'],
    });
  }
  
  async removeFromCarrito(id: number, userId: number) {
    const carritoItem = await this.carritoRepository.findOne({
      where: { id },
      relations: ['pedido', 'pedido.user'],
    });
    if (!carritoItem || carritoItem.pedido.user.id !== userId) {
      throw new NotFoundException('Item de carrito no encontrado');
    }
    return this.carritoRepository.remove(carritoItem);
  }

  async clearCarrito(id_pedido: number) {
    return this.carritoRepository.delete({ pedido: { id: id_pedido } });
  }
}
