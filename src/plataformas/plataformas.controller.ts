import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlataformasService } from './plataformas.service';
import { CreatePlataformaDto } from './dto/create-plataforma.dto';
import { UpdatePlataformaDto } from './dto/update-plataforma.dto';

@Controller('plataformas')
export class PlataformasController {
  constructor(private readonly plataformasService: PlataformasService) {}

  @Post()
  create(@Body() createPlataformaDto: CreatePlataformaDto) {
    return this.plataformasService.create(createPlataformaDto);
  }

  @Get()
  findAll() {
    return this.plataformasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plataformasService.findOne(+id);
  }

  @Patch(':id')
update(@Param('id') id: string, @Body() updatePlataformaDto: UpdatePlataformaDto) {
  return this.plataformasService.update(+id, updatePlataformaDto);
}

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plataformasService.remove(+id);
  }
}
