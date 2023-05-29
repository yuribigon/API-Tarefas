import { ValidationError } from "../../../shared/exceptions";

export const validateUpdateUser = (params : any) => {
  const name = params.name
  const email = params.email
  
  const validationEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
  
  if (typeof name !== 'string' && name !== undefined) {
    throw new ValidationError("Nome obrigatório");
  }
  if(name.indexOf(" ") === -1) throw new ValidationError("O nome precisa incluir sobrenome separado por um espaço.")
  if(name.length <= 6) throw new ValidationError("O nome precisa ter ao menos 7 digitos.")
  
  if (typeof email !== 'string' && email !== undefined) throw new ValidationError("E-mail obrigatório");
  if(!validationEmail.test(email)) throw new ValidationError("Email invalido.");

  return {
    name: name as string,
    email: email as string,
  }
}