import * as dotenv from 'dotenv'
const express = require('express')
import { Express, Request, Response } from 'express';
import { registerMiddlewares } from './middlewares';
import { registerRoutes } from './routes/routes';
import { pgHelper } from './db/typeorm/pg-helper';

dotenv.config();

const port = process.env.PORT||8000;

const app: Express = express();
app.use(express.json())

app.get('/', (_: Request, res: Response) => {
  res.json({ message: 'API waiting for requests...' });
});

registerMiddlewares(app);

registerRoutes(app);

pgHelper.connect()
  .then(() => app.listen(port, () => console.log(`API running at http://localhost:${port}`)))
  .catch((error) => console.log('Error while connection to DB', error));
