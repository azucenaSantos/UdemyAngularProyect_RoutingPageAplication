import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";

export const router: Routes = [
  //NUEVA RUTA HIJA -> ENCARGADA DE REDIRIGIR AL USUARIO A UNA RUTA CON SENTIDO SI ACCEDE POR EJEMLO A USERS/ID/ -> QUE MUESTRE
  //EL CONTENIDO DE USERS/ID/TASKS
  {
    path: '',
    //si no hay nada en la path, redirige a otra path que tenemos como hijo (si accedemos a user/id -> nos lleva a user/id/tasks)
    redirectTo: 'tasks',
    pathMatch: 'prefix',
  },
  {
    path: 'tasks', //dominio/users/userId/tasks
    component: TasksComponent,
    //OJO! como es una clase hija tenemos que añadir un router-outlet en el componente padre porque el del app.component no es suficiente
    //para poder acceder a una ruta huja de un componente!!
    //en el user-tasks.component.html -> añadimos router-outlet donde queramos mostrar a nuestro TaskComponent al acceder a tasks de un user
  },
  {
    //Con esta nueva ruta hija mostraremos el formulario de añadir una nueva task al acceder a tasks/new :D
    path: 'tasks/new',
    component: NewTaskComponent,
  },
];
