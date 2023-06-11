import { Request, Response } from "express";
import { ValidateCreateTask } from "./validators/createTask";
import { TaskRepository } from "./repository";
import { CreateTaskUseCase } from "./usecases/createTaskUseCase";
import { validateGetTask } from "./validators/getTask";
import { GetTaskUseCase } from "./usecases/getTaskUseCase";
import { DeleteTaskUseCase } from "./usecases/deleteUserUseCase";
import { UserRepository } from "../user/repository";
import { ValidationError } from "../../shared/exceptions/validationError";

export const createTaskController = async (req: Request, res: Response) => {
  try {
    console.log('[create-task-controller] Receive request in controller')

    const taskToCreate = ValidateCreateTask(req.body);
    
    const taskRepository = new TaskRepository();
    const userRepository = new UserRepository();

    const usecase = new CreateTaskUseCase(taskRepository, userRepository);

    const result = await usecase.execute(taskToCreate);
    if(!result) return res.status(500).json({ message: 'Erro ao processar nova tarefa.' })

    return res.status(201).json({message: "Tarefa criada com sucesso!", result});
  }

  catch(error : any) {
    console.log('[create-task-controller] Error', error);

    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Erro ao processar nova tarefa.' })
  }
}

export const getTaskController = async (req: Request, res: Response) => {
  try {
    console.log('[get-task-controller] Receive request in controller')

    //VALIDAÇÃO
    const task = validateGetTask(req.params.uuid);
    
    //REPOSITORY
    const taskRepository = new TaskRepository();

    //USECASE
    const usecase = new GetTaskUseCase(taskRepository);
    const result = await usecase.execute(task);

    //RETORNO HTTP
    if (result) {
      res.status(200).json({
        'title': result.getTitle(),
        'description': result.getDescription(),
        'uuid': result.getUuid(),
      })
    }
    else {
      throw new ValidationError("Tarefa não encontrada.")
    }
  }

  catch(error : any) {
    console.log('[get-task-controller] Error', error);

    if (error instanceof ValidationError) {
      res.status(404).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Erro ao processar tarefa.' })
  }
}

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    console.log('[delete-user-controller] Receive request in controller')

    //VALIDAÇÃO
    const taskToRemove = req.params.uuid;
    
    //REPOSITORY
    const taskRepository = new TaskRepository();

    //USECASE
    const taskToDelete = await taskRepository.getTask(taskToRemove);
      if (taskToDelete) {
          await taskRepository.deleteTask(taskToRemove);
      } else {
      throw new Error("Tarefa não encontrada para deletar")
      }

    //RETORNO HTTP
    return res.status(200).json({ message: "Tarefa deletado com sucesso." })
  }

  catch(error : any) {
    console.log('[delete-task-controller] Error', error);

    return res.status(500).json({ message: 'Erro ao deletar tarefa.' })
  }
}

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    console.log('[update-task-controller] Receive request in controller')

    //VALIDAÇÃO
    const uuidToUpdate = req.params.uuid;
    const {title, description} = req.body;
    
    //REPOSITORY
    const taskRepository = new TaskRepository();

    //USECASE         >>>> não consegui utilizar <<<<
    // const usecase = new UpdateUserUseCase(userRepository);
    // await usecase.execute(uuidToUpdate, name, email);

    let task = await taskRepository.getTask(uuidToUpdate);
    if(!task) {
        throw new ValidationError('Tarefa não encontrada');
    }
    
    const updateTask = await taskRepository.updateTask(uuidToUpdate, title, description);

    if(!updateTask){
        return res.status(404).json({message:'Tarefa não encontrada.'})
    }
    task = await taskRepository.getTask(uuidToUpdate);

    //RETORNO HTTP
    return res.status(200).json({ message: "Tarefa atualizada com sucesso." })
  }

  catch(error : any) {
    console.log('[update-task-controller] Error', error);
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message })
    }
  
    return res.status(500).json({ message: 'Erro ao atualizar a tarefa' })
  }
}