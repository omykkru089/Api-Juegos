import { Injectable } from '@nestjs/common';

import * as seedJuegos from './data/juegos.json';
import * as seedCategorias from './data/categoria.json';
import * as seedPlataforma from './data/plataforma.json';
import * as seedDesarrollador from './data/desarroladores.json';
import * as seedEditorial from './data/editorial.json'

import { CategoriasService } from 'src/categorias/categorias.service';
import { Categoria } from 'src/categorias/entities/categoria.entity';
import { DesarrolladoresService } from 'src/desarrolladores/desarrolladores.service';
import { EditorialesService } from 'src/editoriales/editoriales.service';
import { CreateJuegoDto } from 'src/juegos/dto/create-juego.dto';
import { JuegosService } from 'src/juegos/juegos.service';
import { PlataformasService } from 'src/plataformas/plataformas.service';
import { Plataforma } from 'src/plataformas/entities/plataforma.entity';
import { Editoriale } from 'src/editoriales/entities/editoriale.entity';
import { Desarrolladore } from 'src/desarrolladores/entities/desarrolladore.entity';
@Injectable()
export class SeedService {

    constructor (
        private readonly juegoService: JuegosService,
        private readonly categoriaService: CategoriasService,
        private readonly plataformaService: PlataformasService,
        private readonly editorialService: EditorialesService,
        private readonly desarrolladorService: DesarrolladoresService,
    ){}

    public async loadData(){
        await this.insertNewCategorias();
        await this.insertNewPlataformas();
        await this.insertNewEditoriales();
        await this.insertNewDesarrolladores();
        await this.insertNewJuegos();
      }


      private async insertNewJuegos(){
        await this.juegoService.deleteAllJuegos();
        const insertPromisesJuegos = [];
        
        seedJuegos.forEach( (juego: CreateJuegoDto )  => {
          console.log(juego); 
          insertPromisesJuegos.push(this.juegoService.create(juego));
        });
      }
      
      private async insertNewCategorias(){
        await this.categoriaService.deleteAllCategoria();
        const insertPromisesCategorias = [];
        seedCategorias.forEach( (categoria: Categoria) => {
          console.log(categoria); 
            // insertPromisesCategorias.push(this.categoriaService.create(categoria))
            insertPromisesCategorias.push(this.categoriaService.create(categoria));
        })
      }
      
      
      private async insertNewPlataformas(){
            await this.plataformaService.deleteAllPlataforma();
            const insertPromisesPlataformas = [];
            seedPlataforma.forEach( (plataforma: Plataforma)  => {
              console.log(plataforma); 
              insertPromisesPlataformas.push(this.plataformaService.create(plataforma));
            });
        }
      
      private async insertNewEditoriales(){
        await this.editorialService.deleteAllEditorial();
        const insertPromisesEditoriales = [];
        seedEditorial.forEach( (editorial: Editoriale)  => {
          console.log(editorial);  
          insertPromisesEditoriales.push(this.editorialService.create(editorial));
        });
      }
      
      private async insertNewDesarrolladores(){
        await this.desarrolladorService.deleteAllDesarrollador();
        const insertPromisesDesarrolladores = [];
        seedDesarrollador.forEach( (desarrollador: Desarrolladore)  => {
          console.log(desarrollador);  
          insertPromisesDesarrolladores.push(this.desarrolladorService.create(desarrollador));
        });
      }
      
}

