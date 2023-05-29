import { UserEntity } from '../../shared/database/entities/user.entity';
import { DatabaseConnection } from '../../../main/database';
import { Repository } from 'typeorm';
import { User } from '../../models/user';
import { Task } from '../../models/task';

export class UserRepository {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = DatabaseConnection.client.manager.getRepository(UserEntity);
  }

  async createUser(user: User): Promise<User> {
    const entity = new UserEntity();
    entity.user_id = user.getUuid();
    entity.name = user.getName();
    entity.email = user.getEmail();
    entity.password = user.getPassword();
      
    const savedUser = await this.userRepository.save(entity); // DATA MAPPER
    
    return new User(
      savedUser.name,
      savedUser.email,
      savedUser.password,
      savedUser.user_id,
      savedUser.tasks?.length
        ? savedUser.tasks.map((task)=> new Task(
          task.title,
          task.description,
          task.status,
          task.createdAt,
          task.updatedAt,
          task.task_id,
        ))
        : undefined,
    );

    //return savedUser;
  }
  
  async getAllUsers(): Promise<User[]> {
    const allUsers = await this.userRepository.find({
      relations: ['tasks']
    });
    return allUsers.map((entity) => new User(
      entity.name,
      entity.email,
      entity.password,
      entity.user_id,
      entity.tasks?.length
      ? entity.tasks.map((task)=> new Task(
        task.title,
        task.description,
        task.status,
        task.createdAt,
        task.updatedAt,
        task.task_id,
      ))
      : undefined,
    ));
  }
  
  async getUser(uuid: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { user_id: uuid},
      relations: ['tasks'],
    });
    if (user) {
      return new User(
        user.name,
        user.email,
        user.password,
        user.user_id,
        user.tasks?.length
        ? user.tasks.map((task)=> new Task(
          task.title,
          task.description,
          task.status,
          task.createdAt,
          task.updatedAt,
          task.task_id,
        ))
        : undefined,
      );
    }
  }
      
  async deleteUserByUuid(userId: string): Promise<void> {
    const userFound = await this.userRepository.findOne({ where: { user_id : userId }});
    if (userFound) {
      await this.userRepository.delete({ user_id: userId });
    }
  }

  async updateUser(uuid: string, name?: string, email?: string): Promise<string | undefined> {
    const userFound = await this.userRepository.findOne({ where: { user_id : uuid }});
    if (userFound) {
      if(name){
        userFound.name = name;
      }
      if(email){
        userFound.email = email;
      }
  const userUptaded = await this.userRepository.save(userFound);
  return userUptaded.user_id;
    }
  }
}