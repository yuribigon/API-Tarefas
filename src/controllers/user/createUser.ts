import { Request, Response } from "express"
import { User, ValidationError } from "../../models/user";
import { UserRepository } from "../../repository/user.repository";

// export const createUserController = (req: Request, res: Response) => {
//   try {
//     const { name, email } = req.body;
//     const newUser = new User(name, email);
    
//     insertUser(newUser);
//     users.push(newUser);
//     return res.status(200).json("Usuário criado com sucesso!")
//   } catch (error) {
//     if (error instanceof ValidationError) {
//         return res.status(400).json({ message: error.message })
//     }
//     return res.status(500).json({ message: 'Erro ao processar novo usuário.' })
//   }
// }

export const createUserController = async (req: Request, res: Response) => {
  try {
    console.log('[create-user-controller] Receive request in controller')
    const { name, email, password } = req.body;
    const newUser = new User(name, email, password);
    const userRepository = new UserRepository();
    const insertedUuid = await userRepository.createUser(newUser)
    if (insertedUuid) {
      return res.status(201).json("Usuário criado com sucesso!")
    }
  } catch (error) {
    console.log('[create-user-controller] Error', error);
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message })
    }
    return res.status(500).json({ message: 'Erro ao processar novo usuário.' })
  }
}