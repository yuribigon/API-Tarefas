import { User } from "../../../models/user";
import { ValidationError } from "../../../shared/exceptions";
import { UserRepository } from "../repository";

interface UpdateUserUuidDTO {
    uuid: string;
}

interface UpdateUserDTO {
    name: string;
    email: string;
}

export class UpdateUserUseCase {
    constructor(
        private userRepository: UserRepository,
    ){}

    async execute(body: UpdateUserDTO, params: UpdateUserUuidDTO) : Promise<User | undefined> {
        let user = await this.userRepository.getUser(params.uuid);
        if(!user) {
            throw new ValidationError('Usuário não encontrado');
        }
        
        await this.userRepository.updateUser(params.uuid, body.name, body.email);

        return user;
    }
}