import { Juego } from "src/juegos/entities/juego.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Plataforma {

    @Column({ primary: true, generated: true })
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @Column()
    fundador: string;
    @Column()
    anio_de_lanzamiento: string;
    @Column()
    tipos_de_medios_compatibles: string;
    @Column()
    dispositivos: string;
    @OneToMany(() => Juego, (juego) => juego.plataforma)
    juegos: Juego[];

}
