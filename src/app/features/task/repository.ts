import { DatabaseConnection } from '../../../main/database';
import { Repository, getManager } from 'typeorm';
import { Task } from '../../models/task';
import { TaskEntity } from '../../shared/database/entities/task.entity';
import { UserEntity } from '../../shared/database/entities/user.entity';

export class TaskRepository {
  private taskRepository: Repository<TaskEntity>;
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.taskRepository = DatabaseConnection.client.manager.getRepository(TaskEntity);
    this.userRepository = DatabaseConnection.client.manager.getRepository(UserEntity);
  }

  async createTask(task: Task): Promise<Task> {
    const entity = new TaskEntity();
    entity.title = task.getTitle();
    entity.description = task.getDescription();
    entity.status = task.getStatus();
    entity.createdAt = task.getCreatedAt();
    entity.updatedAt = task.getUpdatedAt();
    entity.task_id = task.getUuid();

    if (task.user) {
      const user = await this.userRepository.findOne({where: { user_id : task.user.getUuid() }});
      if (user) {
        entity.user = user;
      }
    }
    
    const savedTask = await this.taskRepository.save(entity); // DATA MAPPER
    
    return new Task(
        savedTask.title,
        savedTask.description,
        savedTask.status,
        savedTask.createdAt,
        savedTask.updatedAt,
        savedTask.task_id,
    );

  }
  
  async getTask(task_id: string): Promise<Task | undefined> {
    const task = await this.taskRepository.findOne({
      where: { task_id },
    });
    if (task) {
        return new Task(
            task.title,
            task.description,
            task.status,
            task.createdAt,
            task.updatedAt,
            task.task_id,
        )
    }
  }
      
  async deleteTask(task_id: string): Promise<void> {
        // const task = await this.taskRepository
        //     .createQueryBuilder("task")
        //     .delete()
        //     .from(TaskEntity)
        //     .where("task_id = ", { uuid })
        //     .execute()
        const taskFound = await this.taskRepository.findOne({where: { task_id }});
        if (taskFound) {
          await this.taskRepository.delete({task_id: task_id});
        }
  }

  async updateTask(task_id: string, title?: string, description?: string): Promise<string | undefined> {
    const taskFound = await this.taskRepository.findOne({ where: { task_id }});
    if (taskFound) {
      if(title){
        taskFound.title = title;
      }
      if(description){
        taskFound.description = description;
      }
  const taskUptaded = await this.taskRepository.save(taskFound);
  return taskUptaded.task_id;
    }
  }

}