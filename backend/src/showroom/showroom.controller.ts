import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ShowroomDto } from './dto/showroom.dto';
import { ShowroomService } from './showroom.service';

@Controller('showroom')
export class ShowroomController {
  constructor(private readonly showroomService: ShowroomService) {}

  @Post()
  public async create(
    @Body() createShowroomDto: ShowroomDto,
  ): Promise<{ uid: string }> {
    const res = await this.showroomService.create(createShowroomDto);

    return { uid: res };
  }

  @Get()
  public async findAll(): Promise<ShowroomDto[]> {
    return await this.showroomService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<ShowroomDto> {
    return await this.showroomService.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateShowroomDto: ShowroomDto,
  ): Promise<void> {
    const res = await this.showroomService.update(id, updateShowroomDto);

    if (!res) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    const res = await this.showroomService.remove(id);
    if (!res) {
      throw new BadRequestException();
    }
  }
}
