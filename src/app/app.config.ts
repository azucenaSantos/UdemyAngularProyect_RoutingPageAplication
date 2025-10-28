import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding(), withRouterConfig({
    //Configuracion
    paramsInheritanceStrategy: 'always' //parametros dinámicos se van a inyectar en las rutas hijas!
  }))],
};
