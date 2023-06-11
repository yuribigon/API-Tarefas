import { Request, Response } from "express";
import { UserRepository } from "./repository";
import { validateGetUsers } from "./validators/getUsers";
import { GetUsersUseCase } from "./usecases/getUsersUseCase";
import { validateCreateUser } from "./validators/createUser";
import { CreateUsersUseCase } from "./usecases/createUsersUseCase";
import { validateGetUserByUuid } from "./validators/getUserByUuid";
import { GetUserByUuidUseCase } from "./usecases/getUsersByUuidUseCase";
import { DeleteUserUseCase } from "./usecases/deleteUserUseCase";
import { ValidationError } from "../../shared/exceptions/validationError";
import { handleControllerError } from "../../shared/exceptions";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    console.log('[get-users-controller] Receive request in controller')

    //VALIDAÇÃO
    const filter = validateGetUsers(req.query);
    
    //REPOSITORY
    const userRepository = new UserRepository();

    //USECASE
    const usecase = new GetUsersUseCase(userRepository);
    const result = await usecase.execute(filter);

    //RETORNO HTTP
    return res.json(result);
  }

  catch(error : any) {
    console.log('[get-users-controller] Error', error);

    handleControllerError(error, res);
  }
}

export const createUserController = async (req: Request, res: Response) => {
  try {
    console.log('[create-users-controller] Receive request in controller')

    const userToCreate = validateCreateUser(req.body);
    
    const userRepository = new UserRepository();

    const usecase = new CreateUsersUseCase(userRepository);
    const result = await usecase.execute(userToCreate);
    if(!result) return res.status(500).json({ message: 'Erro ao processar novo usuário.' })

    return res.status(201).json({message: "Usuário criado com sucesso!", result});
  }

  catch(error : any) {
    console.log('[create-users-controller] Error', error);

    handleControllerError(error, res);
  }
}

export const getUserByUuidController = async (req: Request, res: Response) => {
  try {
    console.log('[get-user-by-uuid-controller] Receive request in controller')

    //VALIDAÇÃO
    const userID = req.params.uuid;
    
    //REPOSITORY
    const userRepository = new UserRepository();

    //USECASE >>>>> NÃO CONSEGUI USAR <<<<<
    // const usecase = new GetUserByUuidUseCase(userRepository);
    // const result = await usecase.execute(user);

    const result = await userRepository.getUser(userID);

    //RETORNO HTTP
    if (result) {
      res.status(200).json({
        'id': result.getUuid(),
        'name': result.getName(),
        'email': result.getEmail(),
      })
    }
    else {
      throw new ValidationError("Usuário não encontrado.")
    }
  }

  catch(error : any) {
    console.log('[get-user-by-uuid-controller] Error', error);

    handleControllerError(error, res);
  }
}

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    console.log('[delete-user-controller] Receive request in controller')

    //VALIDAÇÃO
    const userToRemove = req.params.uuid;
    
    //REPOSITORY
    const userRepository = new UserRepository();

    
    const userToDelete = await userRepository.getUser(userToRemove);
      if (userToDelete) {
          await userRepository.deleteUserByUuid(userToRemove);
      } else {
      throw new Error("Usuário não encontrado para deletar")
      }

    //RETORNO HTTP
    return res.status(200).json({ message: "Usuário deletado com sucesso." })
  }

  catch(error : any) {
    console.log('[delete-user-controller] Error', error);

    return res.status(500).json({ message: 'Erro ao deletar usuário.' })
  }
}

export const updateUserController = async (req: Request, res: Response) => {
  try {
    console.log('[update-user-controller] Receive request in controller')

    //VALIDAÇÃO
    const uuidToUpdate = req.params.uuid;
    const {name, email} = req.body;
    
    //REPOSITORY
    const userRepository = new UserRepository();

    //USECASE >>>> não consegui utilizar <<<<
    // const usecase = new UpdateUserUseCase(userRepository);
    // await usecase.execute(uuidToUpdate, name, email);

    let user = await userRepository.getUser(uuidToUpdate);
    if(!user) {
        throw new ValidationError('Usuário não encontrado');
    }
    
    const updateUser = await userRepository.updateUser(uuidToUpdate, name, email);

    if(!updateUser){
        return res.status(404).json({message:'Usuário não encontrado.'})
    }
    user = await userRepository.getUser(uuidToUpdate);

    //RETORNO HTTP
    return res.status(200).json({ message: "Usuário atualizado com sucesso." })
  }

  catch(error : any) {
    console.log('[update-user-controller] Error', error);
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message })
    }
  
    return res.status(500).json({ message: 'Erro ao atualizar o usuário' })
  }
}