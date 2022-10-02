import { Module } from '@nestjs/common';
import { TeacherService } from './teacher/teacher.service';
import { TeacherController } from './teacher/teacher.controller';

@Module({
  providers: [TeacherService],
  controllers: [TeacherController]
})
export class TeacherModule { }
