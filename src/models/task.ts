import { v4 as uuidv4 } from 'uuid';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class Task {
  private uuidTask: string;
  private status: 'ativo' | 'arquivado' = 'ativo'

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

  getStatus() : 'ativo' | 'arquivado' {
    return this.status;
  }
  
  updateTransaction(title : string | undefined, description : string | undefined, status : 'ativo' | 'arquivado' | undefined) : void {
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