import { ValidationError } from "../../../shared/exceptions/validationError";


export const validateGetUsers = (params : any) => {
    const nameFilter = params.name as string 
    if (typeof nameFilter !== 'string' && nameFilter !== undefined) {
      throw new ValidationError("Nome informado inválido.");
    }

    const emailFilter = params.email as string
    if (typeof emailFilter !== 'string' && emailFilter !== undefined) {
      throw new ValidationError("E-mail informado inválido.");
    }

    return {
        nameFilter: nameFilter as string,
        emailFilter: emailFilter as string
    }
}