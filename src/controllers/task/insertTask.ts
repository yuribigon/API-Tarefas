import { Request, Response } from "express"
import { selectUserByUuid } from "../../db/users";
import { ValidationError } from "../../models/task";

export const insertTaskController = (req: Request, res: Response) => {
  try {
    const userFilter : string = req.params.userID
    const user = selectUserByUuid(userFilter);
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