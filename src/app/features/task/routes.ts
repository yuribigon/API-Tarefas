import { Router } from 'express';
import { createTaskController, getTaskController, updateTaskController, deleteTaskController } from './controller';


export const TASK_ID_ROUTE = '/:uuid'

const taskRoutes = Router();
    
taskRoutes.get(TASK_ID_ROUTE, (req, res) => getTaskController(req, res))
taskRoutes.post('/', (req, res) => createTaskController(req, res)) 
taskRoutes.put(TASK_ID_ROUTE, (req, res) => updateTaskController(req, res)) 
taskRoutes.delete(TASK_ID_ROUTE, (req, res) => deleteTaskController(req, res)) 

export { taskRoutes }