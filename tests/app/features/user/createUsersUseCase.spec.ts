import { UserRepository } from "../../../../src/app/features/user/repository";
import { CreateUsersUseCase } from "../../../../src/app/features/user/usecases/createUsersUseCase"
import { User } from "../../../../src/app/models/user";

describe('create user usecase test', () => {
    beforeEach(() => jest.clearAllMocks());
    

    test('should return promisse type User ', async () => {
        // const sut = makeSut();

        const userData = {
            name: 'Yuri',
            email: 'yuri@email.com',
            password: 'senha123',
        };

        const userRepositoryMock = {
            createUser: jest.fn().mockResolvedValue(userData),
        };

        const createAdminUseCase = new CreateUsersUseCase(
            userRepositoryMock as unknown as UserRepository
        );

        const result = await createAdminUseCase.execute(userData);

        expect(result?.getName).toBe('Yuri');
        expect(result?.getEmail).toBe('yuri@email.com');
        expect(result?.getPassword).toBe('senha123');
       
    });
});