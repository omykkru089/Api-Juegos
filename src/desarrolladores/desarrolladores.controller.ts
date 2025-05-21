import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DesarrolladoresService } from './desarrolladores.service';
import { CreateDesarrolladoreDto } from './dto/create-desarrolladore.dto';
import { UpdateDesarrolladoreDto } from './dto/update-desarrolladore.dto';

@Controller('desarrolladores')
export class DesarrolladoresController {
  constructor(private readonly desarrolladoresService: DesarrolladoresService) {}

  @Post()
  create(@Body() createDesarrolladoreDto: CreateDesarrolladoreDto) {
    return this.desarrolladoresService.create(createDesarrolladoreDto);
  }

  @Get()
  findAll() {
    return this.desarrolladoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desarrolladoresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesarrolladoreDto: UpdateDesarrolladoreDto) {
    return this.desarrolladoresService.update(+id, updateDesarrolladoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desarrolladoresService.remove(+id);
  }
}
