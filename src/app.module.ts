import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { FeedModule } from './feed/feed.module';
import { SchoolModule } from './school/school.module';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { TeacherService } from './teacher/teacher/teacher.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig), TasksModule, FeedModule, SchoolModule, AuthModule, TeacherModule,],
  providers: [TeacherService],
})
export class AppModule { }
