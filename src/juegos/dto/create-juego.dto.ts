import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateJuegoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsArray()
  @IsString({ each: true })
  descripcion: string[];

  @IsString()
  @IsNotEmpty()
  categoria: string;

  @IsString()
  @IsNotEmpty()
  plataforma: string;

  @IsString()
  @IsNotEmpty()
  editorial: string;

  @IsString()
  @IsNotEmpty()
  desarrollador: string;

  @IsString()
  @IsNotEmpty()
  precio: string;

  @IsString()
  @IsNotEmpty()
  fecha_de_lanzamiento: string;

  @IsString({ each: true })
  clasificacion_por_edad: string;

  @IsArray()
  @IsString({ each: true })
  idiomas: string[];

  @IsArray()
  @IsString({ each: true })
  imagen_de_portada: string[];

  @IsArray()
  @IsString({ each: true })
  video: string[];

  @IsArray()
  @IsString({ each: true })
  requisitos_del_sistema: string[];

  @IsString()
  @IsNotEmpty()
  popularidad: string;

  @IsArray()
  @IsString({ each: true })
  link: string[];

  @IsString()
  @IsNotEmpty()
  dispositivo: string;
}