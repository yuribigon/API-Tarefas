import { User } from "../../../models/user";
import { UserRepository } from "../repository";

interface GetUsersDTO {
    nameFilter?: string;
    emailFilter?: string;
}

export class GetUsersUseCase {
    constructor(
        private userRepository: UserRepository,
    ){}

    async execute(params: GetUsersDTO) : Promise<User[]> {
        const allUsers = await this.userRepository.getAllUsers();
        return allUsers;
    }
}