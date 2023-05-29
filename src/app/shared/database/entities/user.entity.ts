import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('users')

export class UserEntity {
  @PrimaryColumn({ name: 'user_id' })
  user_id: string = '';
  
  @Column({ name: 'user_name' })
  name: string = '';
  
  @Column({ name: 'user_email' })
  email: string = '';
  
  @Column({ name: 'user_password' })
  password: string = '';

  @OneToMany(
    () => TaskEntity,
    (task) => task.user)
  tasks?: TaskEntity[];
}
