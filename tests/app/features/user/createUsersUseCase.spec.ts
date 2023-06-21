import { UserRepository } from "../../../../src/app/features/user/repository";
import { CreateUsersUseCase } from "../../../../src/app/features/user/usecases/createUsersUseCase"

describe('create user usecase test', () => {
    beforeEach(() => jest.clearAllMocks());
    
    it('should create a new user', async () => {
        
        const userParams = {
            name: 'Yuri Teste',
            email: 'yuriteste@email.com',
            password: '123456',
        };
        
        const mockedUserRepository = {
            createUser: jest.fn().mockResolvedValue(userParams),
        };

        const createUsersUseCase = new CreateUsersUseCase(
            mockedUserRepository as unknown as UserRepository
        );
        
        const createdUser = await createUsersUseCase.execute(userParams);

        
        expect(createdUser).toEqual({ ...createdUser });
        expect(mockedUserRepository.createUser).toHaveBeenCalledWith(expect.anything());
    });
});