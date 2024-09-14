import { Categoria } from "../../categorias/entities/categoria.entity";
import { Desarrolladore } from "../../desarrolladores/entities/desarrolladore.entity";
import { Editoriale } from "../../editoriales/entities/editoriale.entity";
import { Plataforma } from "../../plataformas/entities/plataforma.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Juego {

    @Column({ primary: true, generated: true })
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @ManyToOne(() => Categoria, (categoria) => categoria.id, {
        eager: true, // para que traiga las categorias al hacer un findone
    })
    categoria: Categoria;
    @ManyToOne(() => Plataforma, (plataforma) => plataforma.id, {
        eager: true, // para que traiga las plataformas al hacer un findone
    })
    plataforma: Plataforma;
    @ManyToOne(() => Editoriale, (editorial) => editorial.id, {
        eager: true, // para que traiga los editoriales al hacer un findone
    })
    editorial: Editoriale;
    @ManyToOne(() => Desarrolladore, (desarrolladore) => desarrolladore.id, {
        eager: true, // para que traiga los desarrolladores al hacer un findone
    })
    desarrollador: Desarrolladore;
    @Column()
    precio: string;
    @Column()
    fecha_de_lanzamiento: string;
    @Column()
    clasificacion_por_edad: string;
    @Column()
    idiomas : string;
    @Column()
    imagen_de_portada: string;
    @Column()
    requisitos_del_sistema: string;
    @Column()
    popularidad: string;
    @Column()
    userEmail:string;
    @ManyToOne(() => User)
    @JoinColumn({name: 'userEmail', referencedColumnName: 'email',})
    user:User;

    
}
