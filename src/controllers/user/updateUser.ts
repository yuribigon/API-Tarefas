import { Request, Response } from "express"
import { updateUserByUuid, users } from "../db/users";
import { ValidationError } from "../models/user";

export const updateUserController = (req: Request, res: Response) => {
    try {
        const uuidToUpdate = req.params.uuid;
        const {name, email} = req.body;
        updateUserByUuid(name, email);
        const userUpdate = users.findIndex((user) => user.getUuid() === uuidToUpdate);
        if(userUpdate === -1) {
            throw new ValidationError("Usuário não encontrado.");
        }
        users[userUpdate].updateUser(name, email);
        return res.status(200).json({ message: "Usuário atualizado com sucesso!" })
    }
    catch(error : any) {
        return res.status(400).json({ message: error.message })
    }
}
