import { Request, Response } from "express"
import { ValidationError } from "../models/user";
import { selectUserByUuid } from "../db/users";

export const insertTaskController = (req: Request, res: Response) => {
  try {
    const userIndex = req.body.userIndex;
    const user = selectUserByUuid(userIndex);
    const title = req.body.title;
    const description = req.body.description;

    if(!user) {
      throw new ValidationError('Usuário não encontrado');
    }

    user.addTask(title, description);


    return res.status(200).json("Tarefa adicionada com sucesso!")
    
  } catch (error) {
    if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Erro ao processar nova tarefa.' })
  }
}