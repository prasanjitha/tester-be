import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateSchoolDto } from '../dto/create-school.dto';
import { SchoolEntity } from '../models/school-entity';
import { School } from '../models/school-interface';

@Injectable()
export class SchoolService {
    constructor(
        @InjectRepository(SchoolEntity)
        private readonly schoolRepository: Repository<SchoolEntity>
    ) { }

    createSchool(createSchoolDto: CreateSchoolDto): Observable<School> {
        return from(this.schoolRepository.save(createSchoolDto));
    }
}
