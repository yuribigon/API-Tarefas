import { Request, Response } from "express"
import { deleteTask } from "../db/users";

export const deleteTaskController = (req: Request, res: Response) => {
    try {
        const { taskID } = req.params;
        const userIndex = req.body.userIndex;
        if(typeof taskID !== 'string' || typeof userIndex !== 'number') {
            return res.status(400).json({ message: "Dados informados incorretos." });
        }
        deleteTask(userIndex, taskID);
        return res.status(200).json({ message: "Tarefa deletada com sucesso." })
    }
    catch(error : any) {
        return res.status(404).json({ message: error.message })
    }
}