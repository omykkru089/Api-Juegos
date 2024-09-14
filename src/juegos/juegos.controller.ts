import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JuegosService } from './juegos.service';
import { CreateJuegoDto } from './dto/create-juego.dto';
import { UpdateJuegoDto } from './dto/update-juego.dto';
import { Role } from '../common/enums/rol.enum';
import { Auth } from '../auth/Decorators/auth.decorator';
import { ActiveUser } from '../common/enums/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interface/user-active.interface';


@Controller('juegos')
export class JuegosController {
  constructor(private readonly juegosService: JuegosService) {}

  @Auth(Role.ADMIN)
  @Post()
  create(@Body() createJuegoDto: CreateJuegoDto, @ActiveUser() user: UserActiveInterface) {
    return this.juegosService.create(createJuegoDto, user);
  }

  @Auth(Role.USER)
  @Get()
  findAll() {
    return this.juegosService.findAll();
  }

  @Auth(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.juegosService.findOne(+id);
  }

  @Auth(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJuegoDto: UpdateJuegoDto) {
    return this.juegosService.update(+id, updateJuegoDto);
  }

  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.juegosService.remove(+id);
  }
}
