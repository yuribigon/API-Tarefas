import { Router } from "express";
import { loginController } from "./controller";

//export const USER_ID_ROUTE = '/:uuid'

const loginRoutes = Router();

loginRoutes.post('/', (req, res) => loginController(req, res));

export { loginRoutes }