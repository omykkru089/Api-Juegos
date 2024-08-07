import { PartialType } from '@nestjs/mapped-types';
import { CreateJuegoDto } from './create-juego.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateJuegoDto  {
    @IsString()
    @IsOptional()
    nombre?: string;
    @IsString()
    @IsOptional()
    Descripcion?: string;
    @IsString()
    @IsOptional()
    Plataforma?: string;
    @IsString()
    @IsOptional()
    Precio?: string;
    @IsString()
    @IsOptional()
    Fecha_de_lanzamiento?: string;
    @IsString()
    @IsOptional()
    Desarrollador?: string;
    @IsString()
    @IsOptional()
    Editorial?: string;
    @IsString()
    @IsOptional()
    Clasificacion_por_edad?: string;
    @IsString()
    @IsOptional()
    Idiomas?: string;
    @IsString()
    @IsOptional()
    Imagen_de_portada?: string;
    @IsString()
    @IsOptional()
    Requisitos_del_sistema?: string;
    @IsString()
    @IsOptional()
    Popularidad?: string;
}
