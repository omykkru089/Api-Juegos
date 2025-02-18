import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Juego } from '../../juegos/entities/juego.entity';
import { Pedido } from 'src/pedidos/entities/pedido.entity';

@Entity()
export class Carrito {
  
  
  
  @PrimaryGeneratedColumn()
  @ManyToOne(() => Pedido, pedido => pedido.id)
  pedido: Pedido;

  @ManyToOne(() => Juego, juego => juego.id)
  juego: Juego;

  @Column()
  cantidad: number;
  
}