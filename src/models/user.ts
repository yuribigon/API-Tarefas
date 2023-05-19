import { v4 as uuidv4 } from 'uuid';
import { Task } from './task';

export class ValidationError extends Error {
}

export class User {
  
  constructor(
    private name: string,
    private email: string,
    private password: string,
    private uuid: string = uuidv4(),
    private tasks?: Task[],
  ) {
    this.setName(name)
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
  getPassword() : string {
    return this.password;
  }
  // getTasks() : Task[] {
  //   return this.tasks;
  // }

  // addTask(title: string, description: string): void {
  //   if(title && description) {
  //     const newTask = new Task(title, description);
            
  //     this.tasks.push(newTask);
  //   } else {
  //     const error = new ValidationError('Dados inválidos')
  //     throw error;
  //   }
  // }
  // deleteTask(index : number) : void {
  //   this.tasks.splice(index, 1);
  // } 
  // updateTask(index : number, title : string | undefined, description : string | undefined, status : 'ativo' | 'arquivado' | undefined ) : void {
  //   this.tasks[index].updateTask(title, description, status);
  // }  
  updateUser(
    name : string,
    email: string,
  ) : void 
  {
    this.name = name;
    this.email = email;
  }
}