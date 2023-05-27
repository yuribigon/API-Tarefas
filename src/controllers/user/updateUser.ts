import { Request, Response } from "express"
import { updateUserByUuid, users } from "../../db/users";
import { ValidationError } from "../../models/user";
import { UserRepository } from "../../repository/user.repository";

// export const updateUserController = (req: Request, res: Response) => {
//     try {
//         const uuidToUpdate = req.params.uuid;
//         const {name, email} = req.body;
//         updateUserByUuid(name, email);
//         const userUpdate = users.findIndex((user) => user.getUuid() === uuidToUpdate);
//         if(userUpdate === -1) {
//             throw new ValidationError("Usuário não encontrado.");
//         }
//         users[userUpdate].updateUser(name, email);
//         return res.status(200).json({ message: "Usuário atualizado com sucesso!" })
//     }
//     catch(error : any) {
//         return res.status(400).json({ message: error.message })
//     }
// }

export const updateUserController = async (req: Request, res: Response) => {
    try {
        console.log('[update-user-controller] Receive request in controller')
        const uuidToUpdate = req.params.uuid;
        const {name, email} = req.body;

        const userRepository = new UserRepository();

        let user = await userRepository.getUser(uuidToUpdate);
        if(!user) {
            throw new ValidationError('Usuário não encontrado');
        }
        
        const updateUser = await userRepository.updateUser(uuidToUpdate, name, email);

        if(!updateUser){
            return res.status(404).json({message:'Usuário não encontrado.'})
        }
        user = await userRepository.getUser(uuidToUpdate);
        
        return res.status(200).json({ message: "Usuário atualizado com sucesso!" })

    } catch (error) {
        console.log('[update-user-controller] Error', error);
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message })
        }
      
        return res.status(500).json({ message: 'Erro ao atualizar o usuário' })
    }
}