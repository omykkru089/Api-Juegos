import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidosService {
  constructor(
      @InjectRepository(Pedido)
      private readonly pedidoRepository: Repository<Pedido>,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}
  
    async addToPedido(userId: number, fecha_creacion: Date, estado: string) {
      const user = await this.userRepository.findOneBy({id: userId});
      const pedidoItem = new Pedido();
      pedidoItem.user = user;  // Creas el usuario por ID
      pedidoItem.fecha_creacion = fecha_creacion;
      pedidoItem.estado = estado;
      return this.pedidoRepository.save(pedidoItem);
    }
    
    async getPedidoByUser(userId: number) {
      return this.pedidoRepository.find({ where: { user: { id: userId } }});
    }
    
    async removeFromPedido(id: number) {
      return this.pedidoRepository.delete(id);
    }
    
    async clearPedido(userId: number) {
      return this.pedidoRepository.delete({ user: { id: userId } });
    }
}
