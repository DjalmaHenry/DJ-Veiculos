import { PartialType } from '@nestjs/mapped-types';
import { CreateShowroomDto } from './create-showroom.dto';

export class UpdateShowroomDto extends PartialType(CreateShowroomDto) {}
