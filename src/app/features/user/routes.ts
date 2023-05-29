import { Router } from "express";
import { createUserController, getUserByUuidController, getUsersController, deleteUserController, updateUserController } from "./controller";

export const USER_ID_ROUTE = '/:uuid'

const userRoutes = Router();

userRoutes.get('/', (req, res) => getUsersController(req, res));
userRoutes.get(USER_ID_ROUTE, (req, res) => getUserByUuidController(req, res));
userRoutes.post('/', (req, res) => createUserController(req, res));
userRoutes.put(USER_ID_ROUTE, (req, res) => updateUserController(req, res));
userRoutes.delete(USER_ID_ROUTE, (req, res) => deleteUserController(req, res));

export { userRoutes }