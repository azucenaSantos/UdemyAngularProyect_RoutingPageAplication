import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';

export const routes: Routes = [
  //Vamos a registrar más rutas, que es como será realmente el funcionamiento del enrutamiento
  {
    path: '', //dominio (sin /rutas varias)
    component: NoTaskComponent,
  },
  {
    path: 'tasks', //dominio/tasks
    component: TasksComponent, //componente que se renderizará
    //Con solo esta configuracion si accecemos al dominio/tasks no se ve nada del TasksComponent
    //porque angular no sabe donde debe mostrarlo, y mejor asi para evitar problemas de que se sobreescriban
    //o desaparezcan componentes :
    //Tenemos que decirle a angular dónde debe mostrar este componente TasksComponent (desde el app.component.html añadir un marcado
    //de donde debe mostrar el componente)
  },
  {
    //Crearemos una ruta para poder acceder a las tasks de un usuario en concreto
    //"Ruta dinámica"
    path: 'users/:userId', //userId será un parámetro dinámico de la ruta
    component: UserTasksComponent, //componente que se mostrará
  },
];
