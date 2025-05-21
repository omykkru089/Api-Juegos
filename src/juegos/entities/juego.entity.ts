import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';
import { Plataforma } from '../../plataformas/entities/plataforma.entity';
import { Editoriale } from '../../editoriales/entities/editoriale.entity';
import { Desarrolladore } from '../../desarrolladores/entities/desarrolladore.entity';

@Entity()
export class Juego {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('json') // Cambiado a JSON
  descripcion: string[];

  @ManyToOne(() => Categoria, (categoria) => categoria.id, { eager: true })
  categoria: Categoria;

  @ManyToOne(() => Plataforma, (plataforma) => plataforma.id, { eager: true })
  plataforma: Plataforma;

  @ManyToOne(() => Editoriale, (editorial) => editorial.id, { eager: true })
  editorial: Editoriale;

  @ManyToOne(() => Desarrolladore, (desarrolladore) => desarrolladore.juegos, { eager: true })
  desarrollador: Desarrolladore;

  @Column({ type: 'enum', enum: ['PC', 'Xbox', 'Playstation', 'Nintendo'], default: 'PC' })
  dispositivo: string;

  @Column()
  precio: string;

  @Column()
  fecha_de_lanzamiento: string;

  @Column() // Cambiado a JSON
  clasificacion_por_edad: string;

  @Column('json') // Cambiado a JSON
  idiomas: string[];

  @Column('json') // Cambiado a JSON
  imagen_de_portada: string[];

  @Column('json') // Cambiado a JSON
  video: string[];

  @Column('json') // Cambiado a JSON
  requisitos_del_sistema: string[];

  @Column()
  popularidad: string;

  @Column('json') // Cambiado a JSON})
  link: string[];
}