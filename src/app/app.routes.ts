import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
    //configuraremos rutas hijas, para acceder a las tasks de un user en concreto
    children: [
      //NUEVA RUTA HIJA -> ENCARGADA DE REDIRIGIR AL USUARIO A UNA RUTA CON SENTIDO SI ACCEDE POR EJEMLO A USERS/ID/ -> QUE MUESTRE
      //EL CONTENIDO DE USERS/ID/TASKS
      {
        path: '',
        //si no hay nada en la path, redirige a otra path que tenemos como hijo (si accedemos a user/id -> nos lleva a user/id/tasks)
        redirectTo: 'tasks',
        pathMatch: 'prefix'
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
    ],
  },
  //Añadiremos una ruta para en caso de que el usuario intente acceder a una pagina que no existe se muestre un componente de pagina not found
  {
    path: '**', //si la path que introduce el usuario no coincide con ninguna de las antes descritas en este arhivo angular salta a aqui
    component: NotFoundComponent, //nuevo componente que se va a mostrar en el hueco de las tasks cuando se acceda a una url inexistente
  },
];
