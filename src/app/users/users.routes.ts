import { Routes } from '@angular/router';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';

export const routes: Routes = [
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
    runGuardsAndResolvers: 'always', //necesitamos esta propiedad para que el resolver se ejecute cuando la path se modifica
    //al hacer click en asc y desc
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    //Con esta nueva ruta hija mostraremos el formulario de añadir una nueva task al acceder a tasks/new :D
    path: 'tasks/new',
    component: NewTaskComponent,
  },
];
