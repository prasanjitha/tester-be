import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }
    @Get()
    getTasks(
        @Query() filterTaskDto: GetFilterTaskDto
    ): Task[] {
        if (Object.keys(filterTaskDto).length) {
            return this.taskService.getTask(filterTaskDto);

        } else {
            return this.taskService.getAllTasks();
        }


    }
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createNewTask(createTaskDto);
    }
    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string,
    ): void {
        return this.taskService.deleteTaskById(id);
    }
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
    ): Task {
        return this.taskService.updateTask(id, status);
    }


}
