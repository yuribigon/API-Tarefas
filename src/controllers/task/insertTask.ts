import { Request, Response } from "express"
import { ValidationError } from "../validations";
import { pgHelper } from "../../db/typeorm/pg-helper";
import { TaskEntity } from "../../db/typeorm/entities/task.entity";
import { v4 as uuidv4 } from 'uuid';

export const insertTaskController = async (req: Request, res: Response) => {
  try {
    const taskRepository = pgHelper.client.getRepository(TaskEntity);
    const newAssessment = await taskRepository.save(
      new TaskEntity({
        uuidTask: uuidv4(),
        ...req.body,
      },
    ))
    if (!newAssessment) {
      throw new ValidationError('Dados incorretos');
    }
    
    return res.status(200).json("Tarefa adicionada com sucesso!")

  } catch (error) {
    if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Erro ao processar nova tarefa.' })
  }
}