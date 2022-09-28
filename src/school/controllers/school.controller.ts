import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateSchoolDto } from '../dto/create-school.dto';
import { School } from '../models/school-interface';
import { SchoolService } from '../services/school.service';

@Controller('school')
export class SchoolController {
    constructor(
        private schoolServices: SchoolService
    ) { }

    @Post()
    create(
        @Body() createSchoolDto: CreateSchoolDto
    ): Observable<School> {
        console.log('call feed');
        return this.schoolServices.createSchool(createSchoolDto);
    }
}
