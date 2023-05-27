// import { NextFunction , Request, Response } from "express";
// import { users } from "../db/_users";

// export const userValidationMiddleware = (req: Request, res: Response, next : NextFunction) => {
//     try {
//         const userID = req.params.userID;
//         const userIndex = users.findIndex((user) => user.getUuid() === userID);
//         if(userIndex !== -1) {
//             req.body.userIndex = userIndex;
//             next();
//         }
        
//     } catch (error) {
//         return res.status(404).json({ message: "Usuario nao encontrado." });
        
//     }
    
    
// }