import { Module } from '@nestjs/common';
import { JuegosService } from './juegos.service';
import { JuegosController } from './juegos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Juego } from './entities/juego.entity';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { Plataforma } from 'src/plataformas/entities/plataforma.entity';
import { Editoriale } from 'src/editoriales/entities/editoriale.entity';
import { Desarrolladore } from 'src/desarrolladores/entities/desarrolladore.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Juego, Categoria, Plataforma, Editoriale, Desarrolladore])],
  controllers: [JuegosController],
  providers: [JuegosService],
  exports: [TypeOrmModule, JuegosService]
})
export class JuegosModule {}
