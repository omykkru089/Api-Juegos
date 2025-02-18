import { BadRequestException, Injectable } from '@nestjs/common';
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

  async addToCarrito(id_pedido: number, juego_Identificador: number, cantidad: number) {
    const juego = await this.juegoRepository.findOneBy({id: juego_Identificador});
    const pedido = await this.pedidoRepository.findOneBy({id: id_pedido});

    if (!juego){
          throw new BadRequestException('Juego no encontrada');
        };
        if (!pedido){
          throw new BadRequestException('Pedido no encontrada');
        };
    const carritoItem = new Carrito();
    carritoItem.pedido = pedido; // Creas el pedido por ID
    carritoItem.juego = juego; // Creas el juego por ID
    carritoItem.cantidad = cantidad;
    return this.carritoRepository.save(carritoItem);
  }

  async getCarritoByPedido(id_pedido: number) {
    return this.carritoRepository.find({ where: { pedido: { id: id_pedido } }});
  }

  async removeFromCarrito(id_pedido: number) {
    return this.carritoRepository.delete(id_pedido);
  }

  async clearCarrito(id_pedido: number) {
    return this.carritoRepository.delete({ pedido: { id: id_pedido } });
  }
}
