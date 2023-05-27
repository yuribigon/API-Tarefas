import { Request, Response } from "express"
import { UserRepository } from "../../repository/user.repository";

// export const deleteUserController = (req: Request, res: Response) => {
//   const uuidToRemove = req.params.uuid;
//   deleteUserByUuid(uuidToRemove);
//   try {
//     return res.status(200).json({ message: "Usuário deletado com sucesso." })
//   }
//   catch(error : any) {
//     return res.status(404).json({ message: error.message })
//   }
// }

export const deleteUserController = async (req: Request, res: Response) => {
  
  try {
    console.log('[delete-user-controller] Receive request in controller')
    const uuidToRemove = req.params.uuid;
    const userRepository = new UserRepository();

    await userRepository.deleteUserByUuid(uuidToRemove);
    return res.status(200).json({ message: "Usuário deletado com sucesso." })
  }
  catch(error : any) {
    console.log('[delete-user-controller] Error', error);
    return res.status(404).json({ message: "Recurso não encontrado" })
    
  }
}

