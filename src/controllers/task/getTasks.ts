import { Request, Response } from "express";
import { Task } from "../../models/task";
import { getUserTasks } from "../../db/users";

export const getTasks = (req: Request, res: Response) => {
    try {
        const userFilter : string = req.params.userID;
        const tasks : Array<Task> = getUserTasks(userFilter);
        if(!tasks.length)res.status(200).json("Esse usuario ainda não tem nenhuma tarefa adicionada.");
        res.status(200).json(tasks);
    }
  catch(error : any) {
    return res.status(400).json({ message: error.message })
  }
}
