import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('tasks')

export class TaskEntity {
  @PrimaryColumn({ name: 'task_id' })
  task_id: string = '';

  @Column({ name: 'task_title' })
  title: string = '';

  @Column({ name: 'task_description' })
  description: string = '';

  @Column({ name: 'task_status_active' })
  status: boolean = true;

  @Column({ name: 'task_created_at' })
  createdAt: string = '';

  @Column({ name: 'task_updated_at' })
  updatedAt: string = '';

  @Column({ name: 'task_user_id' })
  task_user_id: string = '';

  @ManyToOne(() => UserEntity, user => user.tasks)
  @JoinColumn({ name: 'task_user_id' })
  user?: UserEntity;

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  // constructor(entity: Partial<TaskEntity>) {
  //   Object.assign(this, entity)
  // }
}
