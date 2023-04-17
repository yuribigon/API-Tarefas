import { Express } from 'express';
import { createUserController } from './controllers/user/createUser';
import { deleteUserController } from './controllers/user/deleteUser';
import { getTasks } from './controllers/task/getTasks';
import { getUserByUuidController } from './controllers/user/getUserByUuid';
import { getUsersController } from './controllers/user/getUsers';
import { insertTaskController } from './controllers/task/insertTask';
import { updateUserController } from './controllers/user/updateUser';
import { getTaskByUuid } from "./controllers/task/getTaskByUuid";
import { deleteTaskController } from './controllers/task/deleteTask';
import { updateTaskController } from './controllers/task/updateTask';


export function registerRoutes(app: Express) {
  app.get('/users', getUsersController)
  
  app.get('/user/:uuid', getUserByUuidController)
  
  app.post('/createuser', createUserController)
  
  app.put('/user/:uuid', updateUserController)
  
  app.delete('/user/:uuid', deleteUserController)
  
  app.get('/user/:userID/tasks', getTasks)

  app.get('/user/:userID/tasks/:taskID', getTaskByUuid)

  app.post('/user/:userID/tasks', insertTaskController) 

  app.delete('/user/:userID/tasks/:taskID', deleteTaskController) 

  app.put('/user/:userID/tasks/:taskID', updateTaskController) 
}
