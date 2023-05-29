import { v4 as uuidv4 } from 'uuid';
import { Task } from './task';
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
  updateUser(
    name : string,
    email: string,
  ) : void 
  {
    this.name = name;
    this.email = email;
  }
}