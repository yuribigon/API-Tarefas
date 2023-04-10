import { users } from "../../db/users"
import { ValidationError } from "../../models/user";

export function userValidation(
    name : string, email : string)
    : void 
{
        const validacaoEMAIL = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        if(name.indexOf(" ") === -1) {
            throw new ValidationError("O nome precisa incluir sobrenome separado por um espaço.")
        }
        if(name.length <= 6) {
            throw new ValidationError("O nome precisa ter ao menos 7 digitos.")
        }
        if(!validacaoEMAIL.test(email)) {
            throw new ValidationError("Email invalido.")
        }
}