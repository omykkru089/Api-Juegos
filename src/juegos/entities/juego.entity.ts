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

  @ManyToOne(() => Desarrolladore, (desarrolladore) => desarrolladore.id, { eager: true })
  desarrollador: Desarrolladore;

  @Column()
  precio: string;

  @Column()
  fecha_de_lanzamiento: string;

  @Column('json') // Cambiado a JSON
  clasificacion_por_edad: string[];

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

  @Column({
    type: 'varchar', // Cambiado de 'text' a 'varchar'
    length: 255, // Longitud máxima definida
    unique: true, // Mantén la restricción de unicidad
    transformer: {
      to: (value: string[] | null | undefined) => {
        // Si el valor es un array, únelo con comas; si no, devuelve una cadena vacía
        return Array.isArray(value) ? value.join(',') : '';
      },
      from: (value: string | null | undefined) => {
        // Si el valor es una cadena, divídelo en un array; si no, devuelve un array vacío
        return typeof value === 'string' ? value.split(',') : [];
      },
    },
  })
  link: string[];
}