import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { UpdateJuegoDto } from './dto/update-juego.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Juego } from './entities/juego.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Plataforma } from '../plataformas/entities/plataforma.entity';
import { Editoriale } from '../editoriales/entities/editoriale.entity';
import { Desarrolladore } from '../desarrolladores/entities/desarrolladore.entity';
import { UserActiveInterface } from '../common/interface/user-active.interface';
import { Role } from 'src/common/enums/rol.enum';

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


  
  async create(createJuegoDto: CreateJuegoDto, user: UserActiveInterface) {

    const categoria = await this.categoriaRepository.findOneBy({nombre: createJuegoDto.categoria});
    const plataforma = await this.plataformaRepository.findOneBy({nombre: createJuegoDto.plataforma});
    const editorial = await this.editorialRepository.findOneBy({nombre: createJuegoDto.editorial});
    const desarrollador = await this.desarrolladorRepository.findOneBy({nombre: createJuegoDto.desarrollador});

    if (!categoria){
      throw new BadRequestException('Categoria no encontrada');
    }
    if (!plataforma){
      throw new BadRequestException('Plataforma no encontrada');
    }
    if (!editorial){
      throw new BadRequestException('Editorial no encontrada');
    }
    if (!desarrollador){
      throw new BadRequestException('Desarrollador no encontrada');
    }

      return await this.juegoRepository.save({
        ...createJuegoDto,
        categoria,
        plataforma,
        editorial,
        desarrollador,
        userEmail: user.email,
      });
    }

    // user: UserActiveInterface
  async findAll() {
    // if (user.role === Role.ADMIN) {
    //   return await this.juegoRepository.find();
    // }
    return await this.juegoRepository.find(
    //   {
    //   where: { userEmail: user.email },
    // }
  );
  }

  async findOne(id: number) {
    return await this.juegoRepository.findOneBy({id});
  }

  async update(id: number, updateJuegoDto: UpdateJuegoDto) {
    return await this.juegoRepository.update(id, updateJuegoDto);
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
