import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { routes as userRoutes } from './users/users.routes';

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
    //Las rutas hijas se almacenarán en un archivo a parte para mantener la organización le los archivos del proyecto
    children: userRoutes, //usaremos la referencia al archivo de rutas hijas que tenemos en user.route.ts en la carpeta de users :D
    //Más organizado
    //Esta propiedad sirve para definir un objeto de datos
    data: {
      //Establecemos info en estrcturas de clave-valor-> pudiendo acceder a esta info desde el componente que muestra esta path
      message: 'hello',
      //Podemos pasar datos estáticos
    },
  },
  //Añadiremos una ruta para en caso de que el usuario intente acceder a una pagina que no existe se muestre un componente de pagina not found
  {
    path: '**', //si la path que introduce el usuario no coincide con ninguna de las antes descritas en este arhivo angular salta a aqui
    component: NotFoundComponent, //nuevo componente que se va a mostrar en el hueco de las tasks cuando se acceda a una url inexistente
  },
];
