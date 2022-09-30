import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/auth/user.entity';
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

    async createSchool(createSchoolDto: CreateSchoolDto, user: User): Promise<School> {
        const { name } = createSchoolDto;
        const school = new SchoolEntity();
        console.log(user);
        school.name = name;
        school.userId = user.id;
        return await this.schoolRepository.save(school);
    }

    getUserSchool(id: number): Observable<School[]> {
        const query = this.schoolRepository.createQueryBuilder('school');
        query.where('school.userId =:userId', { userId: id });
        const tasks = from(query.getMany());
        return tasks;


    }
}
