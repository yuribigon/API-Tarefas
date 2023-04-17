import { Request, Response } from "express"
import { ValidationError } from "../../models/user";
import { selectUserByUuid, users } from "../../db/users";
import { Task } from "../../models/task";

export const getTaskByUuid = (req: Request, res: Response) => {
    try {
        const uuidFilter = req.params.taskID;
        const userIndex = req.body.userIndex;
        const userFound = selectUserByUuid(userIndex)
    if(!userFound) {
      throw new ValidationError('Usuario não encontrado!');
    }
        const getTask = userFound.getTasks().find((item : Task) => item.getUuidTask() === uuidFilter)
        if(!getTask) {
            throw new ValidationError("Tarefa não encontrada!");
        }
        return res.status(200).json(getTask);
    }
        catch (error) {
        if (error instanceof ValidationError) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Erro interno!" });
    }
};
