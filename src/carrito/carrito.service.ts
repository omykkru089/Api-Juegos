import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
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

  // Agregar un juego al carrito
  async addToCarrito(userId: number, juegoId: number, cantidad: number) {
    let pedido = await this.pedidoRepository.findOne({
      where: { user: { id: userId }, estado: 'pendiente' },
      relations: ['user'],
    });
  
    if (!pedido) {
      pedido = this.pedidoRepository.create({
        user: { id: userId },
        fecha_creacion: new Date(),
        estado: 'pendiente',
      });
      await this.pedidoRepository.save(pedido);
    }
  
    const existingCarritoItem = await this.carritoRepository.findOne({
      where: { pedido: { id: pedido.id }, juego: { id: juegoId } },
      relations: ['pedido', 'juego'],
    });
  
    if (existingCarritoItem) {
      // Incrementar la cantidad si ya existe
      existingCarritoItem.cantidad += cantidad;
      return this.carritoRepository.save(existingCarritoItem);
    }
  
    const juego = await this.juegoRepository.findOne({ where: { id: juegoId } });
    if (!juego) {
      throw new NotFoundException('Juego no encontrado');
    }
  
    const carritoItem = this.carritoRepository.create({
      pedido,
      juego,
      cantidad,
    });
  
    return this.carritoRepository.save(carritoItem);
  }

  // Obtener los elementos del carrito por pedido
  async getCarritoByPedido(userId: number) {
    const pedido = await this.pedidoRepository.findOne({
      where: { user: { id: userId }, estado: 'pendiente' },
      relations: ['user'],
    });

    if (!pedido) {
      throw new NotFoundException('No hay un pedido activo para este usuario');
    }

    return this.carritoRepository.find({
      where: { pedido: { user: { id: userId } } },
      relations: ['pedido', 'juego'], // Incluye las relaciones necesarias
    });
  }

  // Nueva función para obtener todos los carritos
  async findAllCarritos() {
    return this.carritoRepository.find({
      relations: ['pedido', 'pedido.user', 'juego'], // Incluye las relaciones necesarias
    });
  }

  // Nueva función para que los administradores eliminen registros del carrito
  async deleteCarritoAsAdmin(carritoId: number) {
    const carritoItem = await this.carritoRepository.findOne({
      where: { id: carritoId },
      relations: ['pedido'], // Incluye la relación con el pedido
    });
  
    if (!carritoItem) {
      throw new NotFoundException(`Carrito con ID ${carritoId} no encontrado`);
    }
  
    // Eliminar el registro del carrito
    await this.carritoRepository.remove(carritoItem);
  
    // Verificar si el pedido vinculado tiene más elementos en el carrito
    const remainingItems = await this.carritoRepository.find({
      where: { pedido: { id: carritoItem.pedido.id } },
    });
  
    if (remainingItems.length === 0) {
      // Si no hay más elementos en el carrito, eliminar el pedido
      await this.pedidoRepository.remove(carritoItem.pedido);
    }
  
    return { message: `Carrito con ID ${carritoId} eliminado correctamente` };
  }

  // Eliminar un elemento del carrito
  async removeFromCarrito(userId: number, carritoId: number) {
    const carritoItem = await this.carritoRepository.findOne({
      where: { id: carritoId },
      relations: ['pedido', 'pedido.user'],
    });

    if (!carritoItem || carritoItem.pedido.user.id !== userId) {
      throw new NotFoundException('Item de carrito no encontrado o no pertenece al usuario');
    }

    return this.carritoRepository.remove(carritoItem);
  }

  async updateCarritoCantidad(carritoId: number, nuevaCantidad: number) {
    const carritoItem = await this.carritoRepository.findOne({
      where: { id: carritoId },
      relations: ['pedido', 'juego'],
    });
  
    if (!carritoItem) {
      throw new NotFoundException(`Carrito con ID ${carritoId} no encontrado`);
    }
  
    if (nuevaCantidad <= 0) {
      throw new BadRequestException('La cantidad debe ser mayor a 0');
    }
  
    carritoItem.cantidad = nuevaCantidad;
    return this.carritoRepository.save(carritoItem);
  }

  async updateCarrito(userId: number, carritoId: number, cantidad: number) {
    const carritoItem = await this.carritoRepository.findOne({
      where: { id: carritoId },
      relations: ['pedido', 'pedido.user'],
    });
  
    if (!carritoItem || carritoItem.pedido.user.id !== userId) {
      throw new NotFoundException('Item de carrito no encontrado o no pertenece al usuario');
    }
  
    if (cantidad <= 0) {
      throw new Error('La cantidad debe ser mayor a 0');
    }
  
    carritoItem.cantidad = cantidad;
    return this.carritoRepository.save(carritoItem);
  }
}