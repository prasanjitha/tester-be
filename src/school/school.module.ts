import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SchoolController } from './controllers/school.controller';
import { SchoolEntity } from './models/school-entity';
import { SchoolService } from './services/school.service';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolEntity]),
    AuthModule,
  ],
  controllers: [SchoolController],
  providers: [SchoolService]
})
export class SchoolModule { }
