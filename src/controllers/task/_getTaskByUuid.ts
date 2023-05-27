import { Request, Response } from "express"
import { ValidationError } from "../validations";
import { pgHelper } from "../../db/typeorm/pg-helper";
import { TaskEntity } from "../../db/typeorm/entities/task.entity";

export const getTaskByUuid = async (req: Request, res: Response) => {
    try {
        console.log('[get-task-by-uuid-controller] Receive request in controller')
        const uuid = req.params.uuid;
        
        const taskRepository = pgHelper.client.getRepository(TaskEntity);
        const task = await taskRepository.findOne({
            where: { uuid },
            relations: ['growdever']
        })
        
        if(!task) {
            throw new ValidationError("Tarefa não encontrada!");
        }

        return res.status(200).json(task);
    }
    catch (error) {
        console.log('[get-task-by-uuid-controller] Error', error);
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Erro interno!" });
    }
};