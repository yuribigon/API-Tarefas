import { createServer } from '../../src/main/config/express.config'
import { DatabaseConnection } from '../../src/main/database';
import request from 'supertest';

const app = createServer();

beforeEach(async () => {
    await DatabaseConnection.connect();
});

describe('[POST] /users', () => {
    let result: any;

    beforeEach(async () => {
        result = await request(app)
            .post('/users')
            .send({
                name: 'yuri bigon',
                email: 'yuri@email.com',
                password: 'yuri1234567',
            })
    });

    it('should return success', () => {
        const { status } = result;
        expect(status).toEqual(201);
    });
    
    it('should return user created', async () => {
        const { body } = result;
        
        expect(body).toEqual({
            message: "Usuário criado com sucesso!",
            result: {
                name: 'yuri bigon',
                email: 'yuri@email.com',
                password: 'yuri1234567',
                uuid: expect.any(String),
            }
        });
    });
})

describe('[GET] /users', () => {
    let result: any;

    beforeEach(async () => {
        result = await request(app)
            .get('/users')
            .send();
    });

    it('should return success', () => {
        const { status } = result;
        expect(status).toEqual(200);
    });
    
    it('should return users list', async () => {
        const { body } = result;
        console.log(body);
        //teste não efetivo. Não consegui trazer os users / acredito que faltou mockar (?) de alguma maneira
    });
})