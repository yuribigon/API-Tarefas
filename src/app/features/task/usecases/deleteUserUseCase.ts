import { TaskRepository } from "../repository";


interface DeleteTaskDTO {
    uuid: string;
}

export class DeleteTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
    ){}

    async execute(params: DeleteTaskDTO) : Promise<void> {
        await this.taskRepository.deleteTask(params.uuid);
    }
}