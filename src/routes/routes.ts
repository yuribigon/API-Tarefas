import { Express } from 'express';
import { createUserController } from '../controllers/user/createUser';
import { deleteUserController } from '../controllers/user/deleteUser';
import { getTasks } from '../controllers/task/getTasks';
import { getUserByUuidController } from '../controllers/user/getUserByUuid';
import { getUsersController } from '../controllers/user/getUsers';
import { insertTaskController } from '../controllers/task/insertTask';
import { updateUserController } from '../controllers/user/updateUser';
import { getTaskByUuid } from "../controllers/task/_getTaskByUuid";
import { deleteTaskController } from '../controllers/task/deleteTask';
import { updateTaskController } from '../controllers/task/updateTask';
import { USER_ID_ROUTE, USER_ROUTE, TASK_ID_ROUTE, TASK_ROUTE } from './constRoutes';

export function registerRoutes(app: Express) {
  app.get(USER_ROUTE, getUsersController)
  
  app.get(USER_ID_ROUTE, getUserByUuidController)
  
  app.post(USER_ROUTE, createUserController)
  
  app.put(USER_ID_ROUTE, updateUserController)
  
  app.delete(USER_ID_ROUTE, deleteUserController)
  
  app.get(TASK_ID_ROUTE, getTasks)

  app.post(TASK_ROUTE, insertTaskController) 

  app.put(TASK_ID_ROUTE, updateTaskController) 
  
  app.delete(TASK_ID_ROUTE, deleteTaskController) 
}
