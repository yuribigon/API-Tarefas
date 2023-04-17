import { Request, Response } from "express";
import { selectUsersByFilter } from "../../db/users";
import { ValidationError } from "../../models/user";

export const getUsersController = (req: Request, res: Response) => {
  try {
    const nameFilter = req.query.name as string 
    if (typeof nameFilter !== 'string' && nameFilter !== undefined) {
      throw new ValidationError("Nome informado inválido.");
    }

    const emailFilter = req.query.email as string
    if (typeof emailFilter !== 'string' && emailFilter !== undefined) {
      throw new ValidationError("E-mail informado inválido.");
    }

    const allUsers = selectUsersByFilter(nameFilter, emailFilter);

    const usersFilteredMap = allUsers.map((user) =>{
      return {
      "id" : user.getUuid(),
      "name" : user.getName(),
      "email" : user.getEmail(),
      }
    })

    if(!usersFilteredMap.length) {
      res.status(404).json({message : "Nenhum usuário foi encontrado!"});
    }
    res.json(usersFilteredMap);
  }

  catch(error : any) {
    return res.status(400).json({ message: error.message })
  }
}
