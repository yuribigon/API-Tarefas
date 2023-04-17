import { Request, Response } from "express"
import { updateTaskByUuid } from "../../db/users";

export const updateTaskController = (req: Request, res: Response) => {
    try {
        const taskID = req.params.taskID;
        const userIndex = req.body.userIndex;
        let { title, description, status} = req.body;
        
        if(typeof taskID !== 'string') {
            return res.status(400).json({ message: "Dados informados incorretos." });
        }
        if(typeof title !== 'string' && typeof description !== 'string' && (status !== "ativo" &&
        status !== "arquivado") ) {
            return res.status(400).json({ message: "Insira os dados a atualizar de forma correta." }); 
        }
        
        updateTaskByUuid(userIndex, taskID, title, description, status);
        return res.status(200).json({ message: "Tarefa atualizada com sucesso." })
    }
    catch(error : any) {
        return res.status(404).json({ message: error.message })
    }
}