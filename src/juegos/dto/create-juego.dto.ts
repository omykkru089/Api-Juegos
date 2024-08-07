import { IsNumber, IsObject, IsOptional, IsString } from "class-validator";
import { Juego } from "../entities/juego.entity";

export class CreateJuegoDto {

    @IsString()
    nombre: string;
    @IsString()
    descripcion: string;
    @IsString()
    @IsOptional()
    categoria?: string;
    @IsString()
    @IsOptional()
    plataforma?: string;
    @IsString()
    precio: string;
    @IsString()
    @IsOptional()
    fecha_de_lanzamiento?: string;
    @IsString()
    desarrollador: string;
    @IsString()
    editorial: string;
    @IsString()
    clasificacion_por_edad: string;
    @IsString()
    idiomas : string;
    @IsString()
    @IsOptional()
    imagen_de_portada?: string;
    @IsString()
    requisitos_del_sistema: string;
    @IsString()
    popularidad: string;
}
