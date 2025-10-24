import { Component, computed, DestroyRef, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  //Tenemos que obtener el id de la url, para obtener el nombre del user y mostrarlo en el componente
  //userId = input.required<string>(); //con esto ya obtenemos el id de la ruta!! MAGIA XD tiene
  //que ser el mismo nombre que hemos puesto en el app.routes.ts en la path si no es el mismo no va xd

  /*userName = computed(
    () => this.usersService.users.find((u) => u.id == this.userId())?.name
  );*/
  //obtenemos el NAME de aquel usuario cuya id sea como la del userId

  /***************************************/

  //Otra forma de obtener el id de la ruta sin ser con input
  private activatedRoute = inject(ActivatedRoute); //info sobre la ruta que está en la url en este momento
  userName = '';

  ngOnInit() {
    console.log(this.activatedRoute);
    const suscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) =>
        (this.userName =
          this.usersService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || ''), //el paramMap nos permite hacer un get de la parte de la url que queramos
      //en este caso userId que es lo que pusimos en la path del app.routes.ts
    });
    this.destroyRef.onDestroy(() => suscription.unsubscribe());
  }
}
