import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  RouterOutlet,
  RouterLink,
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  //userName = '';
  userName = input.required<String>();
  //Podemos acceder desde este componente a la info del objeto que hemos pasado
  //al data en el app.routes.ts
  message = input.required<string>(); //con el mismo nombre ya lo obtenemos

  //private activatedRoute = inject(ActivatedRoute);
  // ngOnInit(): void {
  //   //la propiedad data contiene los datos fusioandos estáticos y dinámicos
  //   //que tenemos en el app.routes.ts
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => {
  //       console.log(data);
  //     },
  //   });
  // } -> se podria acceder asi al data tambien y de ahi acceder al userName o al message
}

//Funcion que se enviará al resolve del app.routes.ts
export const resolveUserName: ResolveFn<String> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};
