import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { CreateSchoolDto } from '../dto/create-school.dto';
import { School } from '../models/school-interface';
import { SchoolService } from '../services/school.service';

@Controller('school')
@UseGuards(AuthGuard())
export class SchoolController {
    constructor(
        private schoolServices: SchoolService
    ) { }

    @Post()
    create(
        @Body() createSchoolDto: CreateSchoolDto,
        @Req() req
    ) {
        console.log(req.user);
        console.log('call feed');
        return this.schoolServices.createSchool(createSchoolDto, req.user);
    }

    @Get(':id')
    getUserSchool(
        @Param('id') id: number,

    ): Observable<School[]> {
        console.log(id);
        return this.schoolServices.getUserSchool(id);
    }
}
