import { Request, Response } from "express"
import { selectUserByUuid } from "../../db/users";
import { ValidationError } from "../../models/task";

export const getUserByUuidController = (req: Request, res: Response) => {
    try {
      const uuidFilter : string = req.params.uuid
      const userFound = selectUserByUuid(uuidFilter)
      
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
        res.status(404).json({ message: error.message })
    }
}
