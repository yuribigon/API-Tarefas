import { Request, Response } from "express"
import { pgHelper } from "../../db/typeorm/pg-helper";
import { TaskEntity } from "../../db/typeorm/entities/task.entity";
import { ValidationError } from "../validations";

export const updateTaskController = async (req: Request, res: Response) => {
    try {
        console.log('[update-task-controller] Receive request in controller')
        const uuid = req.params.uuid;
        const {title, description, status} = req.body;
        
        const taskRepository = pgHelper.client.getRepository(TaskEntity);
        const task = await taskRepository.findOne({
            where: { uuid }
        })
        
        if(!task) {
            throw new ValidationError("Tarefa não encontrada!");
        }

        if (task){
            task.title = title;
            task.description = description;
            task.status = status;
        }

        const taskUptaded = await taskRepository.save(task);

        return res.status(200).json({ message: "Tarefa atualizada com sucesso." })
    }
    catch(error : any) {
        console.log('[delete-user-controller] Error', error);
        return res.status(500).json({ message: error.message })
    }
}