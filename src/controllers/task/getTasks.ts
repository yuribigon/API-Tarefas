import { Request, Response } from "express";
import { Task } from "../../models/task";

import { ValidationError } from "../validations";
import { pgHelper } from "../../db/typeorm/pg-helper";
import { TaskEntity } from "../../db/typeorm/entities/task.entity";

export const getTasks = async (req: Request, res: Response) => {
  try {
    
    const uuid = req.params.uuid;
    const taskRepository = pgHelper.client.getRepository(TaskEntity);
    const task = await taskRepository.findOne({
      where: { uuid },
      relations: ['growdever']
    })
    
    if (task) res.status(200).json(task);

    throw new ValidationError("Tarefa não encontrada!");

    
  }
catch(error : any) {
  console.log('[get-task-by-uuid-controller] Error', error);
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Erro interno!" });
}
}
