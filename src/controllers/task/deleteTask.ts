import { Request, Response } from "express"
import { deleteTask } from "../../db/users";

export const deleteTaskController = (req: Request, res: Response) => {
    try {
        const { taskID, userID } = req.params;
        
        if(typeof taskID !== 'string' || typeof userID !== 'string') {
            return res.status(400).json({ message: "Dados informados estão incorretos." });
        }
        deleteTask(userID, taskID);
        return res.status(200).json({ message: "Tarefa deletada com sucesso." })
    }
    catch(error : any) {
        return res.status(404).json({ message: error.message })
    }
}