import { Module } from '@nestjs/common';
import { ShowroomModule } from './showroom/showroom.module';

@Module({
  imports: [ShowroomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
