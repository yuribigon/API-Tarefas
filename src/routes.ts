import { Express } from 'express';
import { createUserController } from './controllers/createUser';
import { deleteUserController } from './controllers/deleteUser';
import { getTasks } from './controllers/getTasks';
import { getUserByUuidController } from './controllers/getUserByUuid';
import { getUsersController } from './controllers/getUsers';
import { insertTaskController } from './controllers/insertTask';
import { updateUserController } from './controllers/updateUser';
import { getTaskByUuid } from "./controllers/getTaskByUuid";
import { deleteTaskController } from './controllers/deleteTask';
import { updateTaskController } from './controllers/updateTask';


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
