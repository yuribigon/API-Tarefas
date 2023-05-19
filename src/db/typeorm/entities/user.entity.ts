import { BaseEntity, Entity, Column, PrimaryColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { TaskEntity } from './task.entity';


@Entity({ name: 'user_account' })

export class UserEntity {
  @PrimaryColumn({ name: 'user_id' })
  uuid: string = '';
  
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
