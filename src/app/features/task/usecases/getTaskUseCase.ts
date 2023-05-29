import { Task } from "../../../models/task";
import { TaskRepository } from "../repository";

interface GetTaskDTO {
    uuid: string;
}

export class GetTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
    ){}

    async execute(params: GetTaskDTO) : Promise<Task | undefined> {
        const task = await this.taskRepository.getTask(params.uuid);
        return task;
    }
}