import { ValidationError } from "../../../shared/exceptions/validationError";


export const validateGetUserByUuid = (params : any) => {
    const uuid = params.uuid as unknown as string 
    if (typeof uuid !== 'string' && uuid !== undefined) {
      throw new ValidationError("ID inválido.");
    }
    console.log("o uuid do params é :", uuid);
    
    return {
      uuid: uuid as string,
    }
}