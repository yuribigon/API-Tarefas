import { Request, Response } from "express";
import { validateLoginData } from "./validators/validator";
import { UserRepository } from "../user/repository";
import { LoginUseCase } from "./usecases/loginUseCase";
import { UnauthorizedError } from "../../shared/exceptions/unauthorizedError";
import { handleControllerError } from "../../shared/exceptions";
import jwt from 'jsonwebtoken';

export const loginController = async (req: Request, res: Response) => {
    try {
    
        console.log('[login-controller] Receive request in controller')

        //VALIDAÇÃO
        const loginData = validateLoginData(req.body);

        //REPOSITORY
        const userRepository = new UserRepository();

        //USECASE
        const loginUsecase = new LoginUseCase(userRepository);
        const loggedUser = await loginUsecase.execute(loginData);

        if(!loggedUser) throw new UnauthorizedError('Usuário não encontrado');

        const token = jwt.sign(
            JSON.stringify(loggedUser),
            process.env.MY_SECRET_KEY_JWT as string
        ); 

        //RETORNO HTTP
        return res.status(200).send( { token });
        }

        catch(error : any) {
            console.log('[login-controller] Error', error);
            handleControllerError(error, res);
        }
  }