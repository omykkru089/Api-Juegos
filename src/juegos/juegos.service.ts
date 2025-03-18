import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { UpdateJuegoDto } from './dto/update-juego.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Juego } from './entities/juego.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Plataforma } from '../plataformas/entities/plataforma.entity';
import { Editoriale } from '../editoriales/entities/editoriale.entity';
import { Desarrolladore } from '../desarrolladores/entities/desarrolladore.entity';

@Injectable()
export class JuegosService {

  constructor (
    @InjectRepository(Juego)
    private readonly juegoRepository: Repository<Juego>,
    
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,

    @InjectRepository(Plataforma)
    private readonly plataformaRepository: Repository<Plataforma>,
    @InjectRepository(Editoriale)
    private readonly editorialRepository: Repository<Editoriale>,
    @InjectRepository(Desarrolladore)
    private readonly desarrolladorRepository: Repository<Desarrolladore>,
  ) {}


  
  async create(createJuegoDto: CreateJuegoDto) {
  const categoria = await this.categoriaRepository.findOneBy({
    nombre: createJuegoDto.categoria,
  });
  const plataforma = await this.plataformaRepository.findOneBy({
    nombre: createJuegoDto.plataforma,
  });
  const editorial = await this.editorialRepository.findOneBy({
    nombre: createJuegoDto.editorial,
  });
  const desarrollador = await this.desarrolladorRepository.findOneBy({
    nombre: createJuegoDto.desarrollador,
  });

  if (!categoria) {
    throw new BadRequestException(`Categoría "${createJuegoDto.categoria}" no encontrada`);
  }
  if (!plataforma) {
    throw new BadRequestException(`Plataforma "${createJuegoDto.plataforma}" no encontrada`);
  }
  if (!editorial) {
    throw new BadRequestException(`Editorial "${createJuegoDto.editorial}" no encontrada`);
  }
  if (!desarrollador) {
    throw new BadRequestException(`Desarrollador "${createJuegoDto.desarrollador}" no encontrado`);
  }

  const juego = this.juegoRepository.create({
    ...createJuegoDto,
    categoria,
    plataforma,
    editorial,
    desarrollador,
  });

  return this.juegoRepository.save(juego);
}
async findAll() {
  return await this.juegoRepository.find({ relations: ['categoria', 'plataforma', 'editorial', 'desarrollador'] });
}

  async findOne(id: number) {
    return await this.juegoRepository.findOneBy({id});
  }

  // Nuevo método para buscar por link
  async findOneByLink(link: string): Promise<Juego> {
    const juego = await this.juegoRepository.findOne({ where: { link } });
    if (!juego) {
      throw new NotFoundException(`Juego con link "${link}" no encontrado`);
    }
    return juego;
  }

  async update(id: number, updateJuegoDto: UpdateJuegoDto) {
    // Busca el juego existente
    const juego = await this.juegoRepository.findOneBy({ id });
    if (!juego) {
      throw new NotFoundException(`Juego con ID ${id} no encontrado`);
    }
  
    // Procesa los campos relacionados
    if (updateJuegoDto.categoria) {
      const categoria = await this.categoriaRepository.findOneBy({
        nombre: updateJuegoDto.categoria,
      });
      if (!categoria) {
        throw new BadRequestException(`Categoría "${updateJuegoDto.categoria}" no encontrada`);
      }
      juego.categoria = categoria;
    }
  
    if (updateJuegoDto.plataforma) {
      const plataforma = await this.plataformaRepository.findOneBy({
        nombre: updateJuegoDto.plataforma,
      });
      if (!plataforma) {
        throw new BadRequestException(`Plataforma "${updateJuegoDto.plataforma}" no encontrada`);
      }
      juego.plataforma = plataforma;
    }
  
    if (updateJuegoDto.editorial) {
      const editorial = await this.editorialRepository.findOneBy({
        nombre: updateJuegoDto.editorial,
      });
      if (!editorial) {
        throw new BadRequestException(`Editorial "${updateJuegoDto.editorial}" no encontrada`);
      }
      juego.editorial = editorial;
    }
  
    if (updateJuegoDto.desarrollador) {
      const desarrollador = await this.desarrolladorRepository.findOneBy({
        nombre: updateJuegoDto.desarrollador,
      });
      if (!desarrollador) {
        throw new BadRequestException(`Desarrollador "${updateJuegoDto.desarrollador}" no encontrado`);
      }
      juego.desarrollador = desarrollador;
    }
  
    // Actualiza los campos restantes
    Object.assign(juego, updateJuegoDto);
  
    // Guarda los cambios
    return await this.juegoRepository.save(juego);
  }

  async remove(id: number) {
    return await this.juegoRepository.delete({ id });
  }

  async deleteAllJuegos(){
    const query = this.juegoRepository.createQueryBuilder('juego');
    try{
      return await query  
        .delete()
        .where({})
        .execute()
    }catch(error){
      throw new InternalServerErrorException('sysadmin juego ...')
    }
  }
}
