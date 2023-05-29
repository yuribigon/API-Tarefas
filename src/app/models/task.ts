import { v4 as uuidv4 } from 'uuid';
import { User } from './user';

export class Task {
  user?: User;
  
  constructor(
    private title: string,
    private description: string,
    private status: boolean = true,
    private createdAt: string = "",
    private updatedAt: string = "",
    private uuidTask: string = uuidv4()
  ) {}

  getUuid() : string {
    return this.uuidTask;
  }
  
  getTitle() : string {   
    return this.title;
  }
  
  getDescription() : string {   
    return this.description;
  }

  getStatus() : boolean {
    return this.status;
  }
  getCreatedAt() : string {
    return this.createdAt;
  }
  getUpdatedAt() : string {
    return this.updatedAt;
  }

  setUser(user: User): void {
    this.user = user;
  }
  getUser(): User | undefined {
    return this.user;
  }
  
  updateTask(title : string | undefined, description : string | undefined, status : boolean | undefined) : void {
    if(title) {
      this.title = title;
    }
    if(description) {
      this.description = description;
    }
    if(status) {
      this.status = status;
    }
  }

}