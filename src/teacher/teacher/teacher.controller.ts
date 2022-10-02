import { Controller, Get } from '@nestjs/common';

@Controller('teacher')
export class TeacherController {

    @Get()
    getAllTeachers() {
        console.log('call api');
    }
}
