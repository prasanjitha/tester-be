import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';
import { TaskPost } from './task-interface';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }
    // @Get()
    // getTasks(
    //     @Query() filterTaskDto: GetFilterTaskDto
    // ): Task[] {
    //     if (Object.keys(filterTaskDto).length) {
    //         return this.taskService.getTask(filterTaskDto);

    //     } else {
    //         return this.taskService.getAllTasks();
    //     }


    // }
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTask: TaskPost): Observable<TaskPost> {
        return this.taskService.createTask(createTask);
    }
    // @Get('/:id')
    // getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    //     return this.taskService.getTaskById(id);
    // }

    // @Delete('/:id')
    // deleteTaskById(@Param('id') id: string,
    // ): void {
    //     return this.taskService.deleteTaskById(id);
    // }
    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status') status: TaskStatus,
    // ): Task {
    //     return this.taskService.updateTask(id, status);
    // }


}
