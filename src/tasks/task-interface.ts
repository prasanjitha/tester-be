import { TaskStatus } from "./task-status.enum";

export interface TaskPost {
    id?: number;
    title?: string;
    description?: string;
    status: TaskStatus;
}