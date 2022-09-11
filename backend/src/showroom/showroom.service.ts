import { Injectable } from '@nestjs/common';
import { CreateShowroomDto } from './dto/create-showroom.dto';
import { UpdateShowroomDto } from './dto/update-showroom.dto';

@Injectable()
export class ShowroomService {
  create(createShowroomDto: CreateShowroomDto) {
    return 'This action adds a new showroom';
  }

  findAll() {
    return `This action returns all showroom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} showroom`;
  }

  update(id: number, updateShowroomDto: UpdateShowroomDto) {
    return `This action updates a #${id} showroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} showroom`;
  }
}
