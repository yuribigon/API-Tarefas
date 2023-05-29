import { Task } from "../../../models/task";
import { UserRepository } from "../../user/repository";
import { TaskRepository } from "../repository";

interface CreateTaskDTO {
    title: string,
    description: string,
    task_user_id: string
}

export class CreateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository, 
        private userRepository: UserRepository
    ) {}

    async execute(params: CreateTaskDTO) : Promise<Task | undefined> {
        const user = await this.userRepository.getUser(params.task_user_id);
    if (!user) {
      throw new Error('ID do usuário inválido.');
    }

    const newTask = new Task(params.title, params.description);
    newTask.user = user;

    const taskCreated = await this.taskRepository.createTask(newTask);
    return taskCreated;
    }
}