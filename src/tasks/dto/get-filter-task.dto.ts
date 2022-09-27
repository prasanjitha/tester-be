import { TaskStatus } from "../task-status.enum";


export class GetFilterTaskDto {
    status: TaskStatus;
    search: string;
}