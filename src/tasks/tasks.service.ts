import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetFilterTaskDto } from './dto/get-filter-task.dto';


@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTask(fiterDto: GetFilterTaskDto): Task[] {

        const { status, search } = fiterDto;
        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (search) {
            tasks = tasks.filter(task =>
                task.title.includes(search) ||
                task.descreption.includes(search),

            );

        }
        return tasks;

    }

    createNewTask(createTaskDto: CreateTaskDto) {
        const { title, descreption } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            descreption,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(m => m.id === id);
        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        return found;
    }

    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter((m) => m.id !== id);
    }

    updateTask(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;

    }
}
