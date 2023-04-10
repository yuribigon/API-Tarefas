import { userValidation } from "../helpers/validations/userValidation";
import { Task } from "../models/task";
import { User, ValidationError } from "../models/user";

export let users : User[] = [
  new User('Yuri Bigon', 'yuri@email.com'),
  new User('Giovanna Lopes', 'giovanna@email.com'),
]
users[0].addTask("Limpar casa", "Limpar banheiro e sala");
users[0].addTask("Fazer compras", "Atualizar lista de compras");

export const selectAllUsers = () => users;

export const insertUser = (user: User) => {
  if(users.some(account => account.getEmail() === user.getEmail())){
    throw new ValidationError("Já existe um usuario registrado com esse email.");
    }
    userValidation(user.getName(), user.getEmail());
};

export const selectUserByUuid = (index: number): User | undefined => {
  return users[index];
}

export const deleteUserByUuid = (uuidToRemove: string) => {
  const usersUpdated = users.filter((user) => user.getUuid() !== uuidToRemove)
  if(users.length === usersUpdated.length) {
    throw new ValidationError("Usuario não encontrado.")
  }
  else {
    users = usersUpdated;
  }
}
export const updateUserByUuid = (nome : string, email: string): void => {
  userValidation(nome, email);
}

export const selectUsersByFilter = (nameFilter?: string, emailFilter?: string) : User[] => {
  const filteredUser = users.filter(
      (user) => {
          const nameMatches = nameFilter
              ? user.getName().toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0
              : true;
          const emailMatches = emailFilter 
              ? user.getEmail().toLowerCase().indexOf(emailFilter.toLowerCase()) >= 0
              : true;
          return nameMatches && emailMatches;
      },
  )
  return filteredUser;
} 
export const getUserTasks = (index : number) : Array<Task> => {
  return users[index].getTasks();
}

export const deleteTask = (indexUser : number, taskID: string) => {
  
  const indexTransaction = users[indexUser].getTasks()
  .findIndex((task) => task.getUuidTask() === taskID);
  if(indexTransaction === -1) {
    throw new ValidationError("Tarefa não encontrada.")
  }
  users[indexUser].deleteTask(indexTransaction);
}

export const updateTaskByUuid =
(indexUser : number, taskID: string, title : string | undefined, description : string | undefined) => {
  const indexTask = users[indexUser].getTasks()
  .findIndex((task) => task.getUuidTask() === taskID);
  if(indexTask === -1) {
    throw new ValidationError("Tarefa não encontrada.")
  }
  users[indexUser].updateTransaction(indexTask, title, description);
}