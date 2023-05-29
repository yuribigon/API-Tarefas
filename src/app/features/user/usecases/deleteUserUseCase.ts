import { UserRepository } from "../repository";

interface DeleteUserDTO {
    uuid: string;
}

export class DeleteUserUseCase {
    constructor(
        private userRepository: UserRepository,
    ){}

    async execute(params: DeleteUserDTO) : Promise<void> {
        console.log(`Meu params é ${params}`);
        
        const userToDelete = await this.userRepository.getUser(params.uuid);
        if (userToDelete) {
            await this.userRepository.deleteUserByUuid(params.uuid);
        } else {
        throw new Error("Usuário não encontrado para deletar")
        }
    }
}