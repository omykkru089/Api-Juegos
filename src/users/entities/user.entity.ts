import { Carrito } from "src/carrito/entities/carrito.entity";
import { Role } from "../../common/enums/rol.enum";
import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column({unique: true, nullable: false})
    email: string;

    @Column({nullable: false, select: false})
    password: string;

    @Column({type:'enum', default: Role.USER, enum: Role})
    role: Role

    @DeleteDateColumn()
    deletedlAt: Date;

    @OneToMany(() => Carrito, (Carrito) => Carrito.juego)
    carrito: Carrito[];
}
