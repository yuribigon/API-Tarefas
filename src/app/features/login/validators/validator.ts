import { ValidationError } from "../../../shared/exceptions/validationError";

export const validateLoginData = (params: any) => {
  const { email, password } = params;

  if (typeof email !== 'string') throw new ValidationError("E-mail obrigatório");
  if (typeof password !== 'string') throw new ValidationError("Senha obrigatória");

  return {email, password};
}