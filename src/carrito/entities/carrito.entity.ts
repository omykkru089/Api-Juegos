import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Juego } from '../../juegos/entities/juego.entity';

@Entity()
export class Carrito {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.carrito)
  user: User;

  @ManyToOne(() => Juego, juego => juego.carrito)
  juego: Juego;

  @Column()
  cantidad: number;
  
}