import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { TasksComponent } from './app/tasks/tasks.component';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(
  AppComponent,
  //     {
  //   providers: [
  //     // provideRouter([
  //     //   {
  //     //     //Con esta configuracion estamos registrando una ruta
  //     //     path: 'tasks', //dominio/tasks
  //     //     component: TasksComponent, //componente que se renderizará
  //     //   },
  //     //   //es posible que tengamos muchas rutas y seria costoso implementarlas aqui
  //     //   //asi que creamos un app.routes.ts
  //     // ]),

  //     //para más simplificado,pasamos routes que está en el app.routes.ts
  //     provideRouter(routes),
  //   ],
  // }

  //INCLUSO PODEMOS SIMPLIFICAR MÁS ESTA CONFIGURACION CREANDO UN APP.CONFIG.TS
  appConfig //pasamos solo el objeto que tiene el app.config.ts que a su vez tiene las path que tiene el app.routes.ts
  //más estrcturado y más visible :D
).catch((err) => console.error(err));
