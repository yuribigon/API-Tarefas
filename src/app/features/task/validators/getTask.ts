import { ValidationError } from "../../../shared/exceptions";

export const validateGetTask = (params : any) => {
  const uuid = params.uuid as string 
  if (typeof uuid !== 'string' && uuid !== undefined) {
    throw new ValidationError("ID inválido.");
  }

  return {
    uuid: uuid as string,
  }
}