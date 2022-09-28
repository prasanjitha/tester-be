import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolController } from './controllers/school.controller';
import { SchoolEntity } from './models/school-entity';
import { SchoolService } from './services/school.service';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolEntity])],
  controllers: [SchoolController],
  providers: [SchoolService]
})
export class SchoolModule { }
