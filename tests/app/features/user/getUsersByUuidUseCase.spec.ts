import { randomUUID } from "node:crypto";
import { UserRepository } from "../../../../src/app/features/user/repository";
import { GetUserByUuidUseCase } from "../../../../src/app/features/user/usecases/getUsersByUuidUseCase"

describe('get user by uuid usecase test', () => {
    beforeEach(() => jest.clearAllMocks());
    
    it('should get all users', async () => {
        const userList = [
        {
            name: 'User 1',
            email: 'user1@teste.com',
            password: 'senha123',
            uuid: "example-uuid",
        },
        {
            name: 'User 2',
            email: 'user2@teste.com',
            password: 'senha123',
            uuid: randomUUID(),
        },
        {
            name: 'User 3',
            email: 'user2@teste.com',
            password: 'senha123',
            uuid: randomUUID(),
        }]


        const uuidParams = {
            uuid: 'example-uuid'
        }

        const mockedUserRepository = {
            getUser: jest.fn().mockResolvedValue(userList[0]),
        };

        const getUsersUseCase = new GetUserByUuidUseCase(
            mockedUserRepository as unknown as UserRepository
        );
        
        const user = await getUsersUseCase.execute(uuidParams);

        expect(mockedUserRepository.getUser).toHaveBeenCalled();
        expect(user).toEqual(userList[0]);
        
    });
});