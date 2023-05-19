import { UserEntity } from '../db/typeorm/entities/user.entity';
import { pgHelper } from '../db/typeorm/pg-helper';
import { Repository } from 'typeorm';
import { User } from '../models/user';
import { Task } from '../models/task';

export class UserRepository {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = pgHelper.client.manager.getRepository(UserEntity);
  }

  async createUser(user: User): Promise<string> {
    const entity = new UserEntity();
    entity.uuid = user.getUuid();
    entity.name = user.getName();
    entity.email = user.getEmail();
    entity.password = user.getPassword();
      
    const savedUser = await this.userRepository.save(entity); // DATA MAPPER
    
    return savedUser.uuid;
  }

  async deleteUserByUuid(uuid: string): Promise<void> {
    const user = await this.userRepository
        .createQueryBuilder("user")
        .delete()
        .from(UserEntity)
        .where("user_uid = ", { uuid })
        .execute()
  }

  async getAllUsers(): Promise<User[]> {
    const allUsers = await this.userRepository.find();
    return allUsers.map((entity) => new User(
      entity.name,
      entity.email,
      entity.password,
      entity.uuid
    ));
  }

  async getGrowdever(uuid: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { uuid },
      relations: ['task'],
    });
    if (user) {
      return new User(
        user.name,
        user.email,
        user.password,
        user.uuid,
        user.tasks?.length
          ? user.tasks.map((task)=> new Task(
            task.title,
            task.description,
            task.status,
            task.createdAt,
            task.updatedAt,
            task.uuid,
          ))
          : undefined,
      );
    }
  }
}