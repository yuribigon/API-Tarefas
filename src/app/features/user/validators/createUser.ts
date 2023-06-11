import { ValidationError } from "../../../shared/exceptions/validationError";

export const validateCreateUser = (params : any) => {
  const name = params.name
  const email = params.email
  const password = params.password
  const validationEmail = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
  
  if (typeof name !== 'string' && name !== undefined) {
    throw new ValidationError("Nome obrigatório");
  }
  if(name.indexOf(" ") === -1) throw new ValidationError("O nome precisa incluir sobrenome separado por um espaço.")
  if(name.length <= 6) throw new ValidationError("O nome precisa ter ao menos 7 digitos.")
  
  if (typeof email !== 'string' && email !== undefined) throw new ValidationError("E-mail obrigatório");
  if(!validationEmail.test(email)) throw new ValidationError("Email invalido.");

  if (typeof password !== 'string' && password !== undefined) throw new ValidationError("Senha obrigatória");
  if (password.indexOf(' ') >= 0 || password.length < 10) throw new ValidationError("Senha inválida");

  return {
    name: name as string,
    email: email as string,
    password: password as string
    }
}