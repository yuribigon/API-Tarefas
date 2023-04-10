import { v4 as uuidv4 } from 'uuid';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class Task {
  private uuidTask: string;

  constructor(
    private title: string,
    private description: string,
  ) {
    this.uuidTask = uuidv4();
  }

  getUuidTask() : string {
    return this.uuidTask;
  }

  getTitle() : string {   
    return this.title;
  }
  
  getDescription() : string {   
    return this.description;
  }

  
  updateTransaction(title : string | undefined, description : string | undefined) : void {
    if(title) {
      this.title = title;
    }
    if(description) {
      this.description = description;
    }
  }

}