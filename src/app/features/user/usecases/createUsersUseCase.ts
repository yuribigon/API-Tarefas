import { User } from "../../../models/user";
import { UserRepository } from "../repository";

interface CreateUsersDTO {
    name: string;
    email: string;
    password: string;
}

export class CreateUsersUseCase {
    constructor(
        private userRepository: UserRepository,
    ){}

    async execute(params: CreateUsersDTO) : Promise<User | undefined> {
        const newUser = new User(params.name, params.email, params.password);
        const userCreated = await this.userRepository.createUser(newUser);
        return userCreated;
    }
}