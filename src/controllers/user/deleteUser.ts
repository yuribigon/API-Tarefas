import { Request, Response } from "express"
import { deleteUserByUuid } from "../db/users";

export const deleteUserController = (req: Request, res: Response) => {
  const uuidToRemove = req.params.uuid;
  deleteUserByUuid(uuidToRemove);
  try {
    return res.status(200).json({ message: "Usuário deletado com sucesso." })
  }
  catch(error : any) {
    return res.status(404).json({ message: error.message })
  }
}
