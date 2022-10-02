import { Injectable } from '@nestjs/common';

@Injectable()
export class TeacherService {
    private teachers = [];

    getAllTeachers() {
        if (this.teachers.length === 0)
            return 'Teachers not found.'
        else
            return this.teachers;
    }
}
