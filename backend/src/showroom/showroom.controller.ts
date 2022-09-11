import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShowroomService } from './showroom.service';
import { CreateShowroomDto } from './dto/create-showroom.dto';
import { UpdateShowroomDto } from './dto/update-showroom.dto';

@Controller('showroom')
export class ShowroomController {
  constructor(private readonly showroomService: ShowroomService) {}

  @Post()
  create(@Body() createShowroomDto: CreateShowroomDto) {
    return this.showroomService.create(createShowroomDto);
  }

  @Get()
  findAll() {
    return this.showroomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.showroomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShowroomDto: UpdateShowroomDto) {
    return this.showroomService.update(+id, updateShowroomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.showroomService.remove(+id);
  }
}
