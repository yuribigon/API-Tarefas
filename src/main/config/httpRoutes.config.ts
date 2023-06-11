import { Express } from 'express';
import { userRoutes } from '../../app/features/user/routes';
import { taskRoutes } from '../../app/features/task/routes';
import { loginRoutes } from '../../app/features/login/routes';

export function registerRoutes(app: Express) {
  app.use('/users', userRoutes)
  app.use('/tasks', taskRoutes)
  app.use('/login', loginRoutes)
  
}