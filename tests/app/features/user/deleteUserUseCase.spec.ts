import { UserRepository } from "../../../../src/app/features/user/repository";
import { DeleteUserUseCase } from "../../../../src/app/features/user/usecases/deleteUserUseCase"
import { randomUUID } from 'node:crypto';

describe('delete user usecase test', () => {
    beforeEach(() => jest.clearAllMocks());
    
    it('should delete a user', async () => {
        
        const userParams = {
            uuid: 'any uuid',
        };
        
        const mockedUserRepository = {
            deleteUserByUuid: jest.fn().mockResolvedValue(userParams),
            getUser: jest.fn().mockResolvedValue(userParams),
        };

        const deleteUserUseCase = new DeleteUserUseCase(
            mockedUserRepository as unknown as UserRepository
        );
        
        const deletedUser = await deleteUserUseCase.execute(userParams);

        expect(mockedUserRepository.deleteUserByUuid).toHaveBeenCalledWith(expect.anything());
    });
});