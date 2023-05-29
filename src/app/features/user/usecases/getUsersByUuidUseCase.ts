import { User } from "../../../models/user";
import { UserRepository } from "../repository";

interface GetUserByUuidDTO {
    uuid: string;
}

export class GetUserByUuidUseCase {
    constructor(
        private userRepository: UserRepository,
    ){}

    async execute(params: GetUserByUuidDTO) : Promise<User| undefined> {
        const user = await this.userRepository.getUser(params.uuid);
        return user;
    }
}