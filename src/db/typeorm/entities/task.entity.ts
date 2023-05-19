import { Entity, Column, PrimaryColumn, BeforeInsert, BeforeUpdate, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'task' })
export class TaskEntity {
  @PrimaryColumn({ name: 'task_id' })
  uuid: string = '';

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
  userUuid: string = '';

  @ManyToOne(() => UserEntity, { eager: true })
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

  constructor(entity: Partial<TaskEntity>) {
    Object.assign(this, entity)
  }
}
