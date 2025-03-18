import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriasService {
  constructor (
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>
  
  ) {}
  async create(createCategoriaDto: CreateCategoriaDto) {
    return await this.categoriaRepository.save(createCategoriaDto);
  }

  async findOneByName(nombre: string): Promise<Categoria> {
    return await this.categoriaRepository.findOneBy({ nombre });
  }

async findAll() {
  return await this.categoriaRepository.find();
}

async findOne(id: number) {
  return await this.categoriaRepository.findOneBy({id});
}

async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
  return await this.categoriaRepository.update(id, updateCategoriaDto);
}

async remove(id: number) {
  return await this.categoriaRepository.delete({ id });
}

async deleteAllCategoria(){
  const query = this.categoriaRepository.createQueryBuilder('categoria');
  try{
    return await query 
      .delete()
      .where({})
      .execute()
  }catch(error){
    throw new InternalServerErrorException('sysadmin categoria ...')
  }
}
}
