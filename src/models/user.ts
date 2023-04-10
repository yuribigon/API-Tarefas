import { v4 as uuidv4 } from 'uuid';
import { Task } from './task';

export class ValidationError extends Error {
}

export class User {
  private uuid: string;

  constructor(
    private name: string,
    private email: string,
    private tasks: Task[] = [],
  ) {
    this.setName(name)
    this.uuid = uuidv4();
  }
   
  getUuid() : string {
    return this.uuid;
  }

  getName() : string {
    return this.name;
  }

  setName(name : string){
    this.name = name;
  }

  getEmail() : string {
    return this.email;
  }

  getTasks() : Task[] {
    return this.tasks;
  }

  addTask(title: string, description: string): void {
    if(title && description) {
      const newTask = new Task(title, description);
            
      this.tasks.push(newTask);
    } else {
      const error = new ValidationError('Dados inválidos')
      throw error;
    }
  }
  deleteTask(index : number) : void {
    this.tasks.splice(index, 1);
  } 
  updateTransaction(index : number, title : string | undefined, description : string | undefined) : void {
    this.tasks[index].updateTransaction(title, description);
  }  
  updateUser(
    name : string,
    email: string,
  ) : void 
  {
    this.name = name;
    this.email = email;
  }
}