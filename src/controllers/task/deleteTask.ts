import { Request, Response } from "express"
import { pgHelper } from "../../db/typeorm/pg-helper";
import { TaskEntity } from "../../db/typeorm/entities/task.entity";

export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        console.log('[delete-task-controller] Receive request in controller')
        const uuid = req.params.uuid;
        const taskRepository = pgHelper.client.getRepository(TaskEntity)
        const taskToDelete = await taskRepository
            .createQueryBuilder("task")
            .delete()
            .from(TaskEntity)
            .where("task_id = ", { uuid })
            .execute()

        if(!taskToDelete) {
            return res.status(400).json({ message: "Dados informados estão incorretos." });
        }
        
        return res.status(200).json({ message: "Tarefa deletada com sucesso." })
    }
    catch(error : any) {
        console.log('[delete-task-controller] Error', error);
        return res.status(500).json({ message: error.message })
    }
}
