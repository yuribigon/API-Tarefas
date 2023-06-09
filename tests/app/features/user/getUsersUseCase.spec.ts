import { randomUUID } from "node:crypto";
import { UserRepository } from "../../../../src/app/features/user/repository";
import { GetUsersUseCase } from "../../../../src/app/features/user/usecases/getUsersUseCase"

describe('get users usecase test', () => {
    beforeEach(() => jest.clearAllMocks());
    
    it('should get all users', async () => {
        const userList = [
        {
            uuid: randomUUID(),
            name: 'User 1',
            email: 'user1@teste.com',
            password: 'senha123',
        },
        {
            uuid: randomUUID(),
            name: 'User 2',
            email: 'user2@teste.com',
            password: 'senha123',
        },
        {
            uuid: randomUUID(),
            name: 'User 3',
            email: 'user2@teste.com',
            password: 'senha123',
        }]


        const userParams = {
            nameFilter: 'test'
        }

        const mockedUserRepository = {
            getAllUsers: jest.fn().mockResolvedValue(userList),
        };

        const getUsersUseCase = new GetUsersUseCase(
            mockedUserRepository as unknown as UserRepository
        );
        
        const allUsers = await getUsersUseCase.execute(userParams);

        expect(mockedUserRepository.getAllUsers).toHaveBeenCalled();
        expect(allUsers).toEqual(userList);
        
    });
});