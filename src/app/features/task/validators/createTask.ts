import { ValidationError } from "../../../shared/exceptions/validationError";

export const ValidateCreateTask = (params : any) => {
  const title = params.title
  const description = params.description
  const task_user_id = params.task_user_id
  
  if (typeof title !== 'string' || title.length === 0) {
    throw new ValidationError("Título obrigatório");
  }

  if (title.length < 3) {
    throw new ValidationError("O título da tarefa precisa ter pelo menos 3 caracteres.");
  }

  if (typeof description !== 'string' || description.length === 0) {
    throw new ValidationError("Descrição obrigatória");
  }

  if (typeof task_user_id !== 'string' || task_user_id.length === 0) {
    throw new ValidationError("ID de usuário obrigatório");
  }

  return {
    
    title: title as string,
    description: description as string,
    task_user_id: task_user_id as string
  };
}