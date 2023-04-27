import { Request, Response } from "express";
import { Task, ValidationError } from "../../models/task";
import { getUserTasks, selectTasksByFilter } from "../../db/users";

export const getTasks = (req: Request, res: Response) => {
    try {
      const userFilter : string = req.params.userID;
      const tasks : Array<Task> = getUserTasks(userFilter);
      if(!tasks.length)res.status(200).json("Esse usuario ainda não tem nenhuma tarefa adicionada.");

      const titleFilter = req.query.title as string 
      if (typeof titleFilter !== 'string' && titleFilter !== undefined) {
        throw new ValidationError("Título informado inválido.");
      }

      const statusFilter = req.query.status as string
      if (typeof statusFilter !== 'string' && statusFilter !== undefined) {
        throw new ValidationError("Status informado inválido.");
      }
      
      const allTasks = selectTasksByFilter(tasks, titleFilter, statusFilter);

      const tasksFilteredMap = allTasks.map((task) =>{
        return {
          "id" : task.getUuidTask(),
          "title" : task.getTitle(),
          "description" : task.getDescription(),
          "status" : task.getStatus(),
        }
      })
      
      if(!tasksFilteredMap.length) {
        res.status(404).json({message : "Nenhuma tarefa foi encontrada!"});
      }

      res.status(200).json(tasksFilteredMap);
    }
  catch(error : any) {
    return res.status(400).json({ message: error.message })
  }
}
