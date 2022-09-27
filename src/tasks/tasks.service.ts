import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { FeedPostEntity } from 'src/feed/models/post-entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskPost } from './task-interface';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) { }

    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTask(fiterDto: GetFilterTaskDto): Task[] {

    //     const { status, search } = fiterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.descreption.includes(search),

    //         );

    //     }
    //     return tasks;

    // }

    // createNewTask(createTaskDto: CreateTaskDto) {
    //     const { title, descreption } = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         descreption,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task;
    // }

    createTask(createTaskDto: TaskPost): Observable<TaskPost> {

        return from(this.taskRepository.save(createTaskDto));

    }

    // async getTaskById(id: any): Promise<Task> {
    //     const found = await this.taskRepository.findOne(id);
    //     if (!found) {
    //         throw new NotFoundException(`Task with ID ${id} not found`);
    //     }

    //     return found;
    // }

    // deleteTaskById(id: string): void {
    //     this.tasks = this.tasks.filter((m) => m.id !== id);
    // }

    // updateTask(id: string, status: TaskStatus): Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;

    // }
}
