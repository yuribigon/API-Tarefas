import { User } from "../../../models/user";
import { UserRepository } from "../../user/repository";

interface LoginDataDTO {
    email?: string;
    password?: string;
}

export class LoginUseCase {
    constructor( private userRepository: UserRepository ) {}

    async execute(loginData: LoginDataDTO) : Promise<User| undefined> {
        const userFound = await this.userRepository.listUsers(loginData);
        return userFound.length > 0
            ? userFound[0].toJson() as User
            : undefined;
       
    }
}