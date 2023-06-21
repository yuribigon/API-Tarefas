import { UserRepository } from "../../../../src/app/features/user/repository";
import { GetUsersUseCase } from "../../../../src/app/features/user/usecases/getUsersUseCase"

describe('get users usecase test', () => {
    beforeEach(() => jest.clearAllMocks());
    
    it('should get all users', async () => {
        
        const userParams = {
            nameFilter: 'test'
        }

        const mockedUserRepository = {
            getAllUsers: jest.fn().mockResolvedValue(userParams),
        };

        const getUsersUseCase = new GetUsersUseCase(
            mockedUserRepository as unknown as UserRepository
        );
        
        const deletedUser = await getUsersUseCase.execute(userParams);

        expect(mockedUserRepository.getAllUsers).toHaveBeenCalledWith(expect.anything());
        
    });
});