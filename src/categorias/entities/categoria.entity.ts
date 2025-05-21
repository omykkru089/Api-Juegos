import { Juego } from "src/juegos/entities/juego.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Categoria {

    @Column({ primary: true, generated: true })
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @OneToMany(() => Juego, (juego) => juego.categoria)
    juegos: Juego[];

    
    
}
