import { Request, Response } from "express"
import { ValidationError } from "../validations";
import { UserRepository } from "../../repository/user.repository";

export const getUserByUuidController = async (req: Request, res: Response) => {
  try {
    console.log('[get-user-by-uuid-controller] Receive request in controller')
    const uuidFilter : string = req.params.uuid
    const userRepository = new UserRepository();
    const userFound = await userRepository.getUser(uuidFilter)
    
    if (userFound) {
      res.status(200).json({
        'id': userFound.getUuid(),
        'name': userFound.getName(),
        'email': userFound.getEmail(),
      })
    }
    else {
      throw new ValidationError("Usuário não encontrado.")
    }
  }
  catch(error : any) {
    console.log('[get-user-by-uuid-controller] Error', error);
      res.status(404).json({ message: error.message })
  }
}