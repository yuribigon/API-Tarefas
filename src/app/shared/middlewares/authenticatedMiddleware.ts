import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { User } from "../../models/user";
import { UnauthorizedError } from "../exceptions/unauthorizedError";
import { handleControllerError } from "../exceptions";

export const authenticatedMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('[authenticated-middleware] Receive authenticated user by headers')
        const jwtToken = req.headers.authorization;
        if (!jwtToken) throw new UnauthorizedError('JWT não enviado');
        const decoded = jwt.verify(jwtToken, process.env.MY_SECRET_KEY_JWT as string);

        if (typeof decoded !== 'object') throw new Error('Decoded JWT formatted wrongly');
        if (typeof decoded.uuid !== 'string') throw new Error('Decoded JWT formatted wrongly');
        if (typeof decoded.name !== 'string') throw new Error('Decoded JWT formatted wrongly');
        if (typeof decoded.email !== 'string') throw new Error('Decoded JWT formatted wrongly');

        req.body.authenticatedUser = new User(
            decoded.uuid,
            decoded.name,
            decoded.email,
            undefined,
            decoded.tasks
        );
        next();
    } catch (error) {
        console.log('[authenticated-middleware] Error', error);
        handleControllerError(error, res);
    }
}