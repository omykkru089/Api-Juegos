import { PartialType } from '@nestjs/mapped-types';
import { CreateJuegoDto } from './create-juego.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateJuegoDto  {
    @IsString()
    @IsOptional()
    nombre?: string;
    @IsString()
    @IsOptional()
    descripcion?: string;
    @IsString()
    @IsOptional()
    precio?: string;
    @IsString()
    @IsOptional()
    fecha_de_lanzamiento?: string;
    @IsString()
    @IsOptional()
    @IsString()
    @IsOptional()
    clasificacion_por_edad?: string;
    @IsString()
    @IsOptional()
    idiomas?: string;
    @IsString()
    @IsOptional()
    imagen_de_portada?: string;
    @IsString()
    @IsOptional()
    requisitos_del_sistema?: string;
    @IsString()
    @IsOptional()
    popularidad?: string;
}
