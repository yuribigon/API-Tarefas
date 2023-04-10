import { Express } from 'express';
import { userValidationMiddleware } from './userValidationMiddleware';


export const registerMiddlewares = (app: Express) => {
  app.get('/user/:userID/tasks', userValidationMiddleware)

  app.get('/user/:userID/tasks/:taskID', userValidationMiddleware)

  app.post('/user/:userID/tasks', userValidationMiddleware) 

  app.delete('/user/:userID/tasks/:taskID', userValidationMiddleware) 

  app.put('/user/:userID/tasks/:taskID', userValidationMiddleware)

}