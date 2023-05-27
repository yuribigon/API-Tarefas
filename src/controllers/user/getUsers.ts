import { Request, Response } from "express";
import { selectUsersByFilter } from "../../db/users";
import { ValidationError } from "../../models/user";
import { UserRepository } from "../../repository/user.repository";

// export const getUsersController = (req: Request, res: Response) => {
//   try {
//     const nameFilter = req.query.name as string 
//     if (typeof nameFilter !== 'string' && nameFilter !== undefined) {
//       throw new ValidationError("Nome informado inválido.");
//     }

//     const emailFilter = req.query.email as string
//     if (typeof emailFilter !== 'string' && emailFilter !== undefined) {
//       throw new ValidationError("E-mail informado inválido.");
//     }

//     const allUsers = selectUsersByFilter(nameFilter, emailFilter);

//     const usersFilteredMap = allUsers.map((user) =>{
//       return {
//       "id" : user.getUuid(),
//       "name" : user.getName(),
//       "email" : user.getEmail(),
//       }
//     })

//     if(!usersFilteredMap.length) {
//       res.status(404).json({message : "Nenhum usuário foi encontrado!"});
//     }
//     res.json(usersFilteredMap);
//   }

//   catch(error : any) {
//     return res.status(400).json({ message: error.message })
//   }
// }

export const getUsersController = async (req: Request, res: Response) => {
  try {
    console.log('[get-users-controller] Receive request in controller')
    const nameFilter = req.query.name as string 
    if (typeof nameFilter !== 'string' && nameFilter !== undefined) {
      throw new ValidationError("Nome informado inválido.");
    }

    const emailFilter = req.query.email as string
    if (typeof emailFilter !== 'string' && emailFilter !== undefined) {
      throw new ValidationError("E-mail informado inválido.");
    }

    const userRepository = new UserRepository();
    const allUsers = await userRepository.getAllUsers();

    if(!allUsers.length) {
      res.status(404).json({message : "Nenhum usuário foi encontrado!"});
    }
    res.json(allUsers);
  }

  catch(error : any) {
    console.log('[get-users-controller] Error', error);
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Erro ao processar novo usuário.' })
  }
}