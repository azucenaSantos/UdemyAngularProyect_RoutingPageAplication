import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  private tasksService = inject(TasksService);

  //Queremos poder imprimir las tasks de un usuario concreto, ¿cómo?
  //Como tenemos las rutas dinámicas con el id del usuario podemos obtener
  //el id de la ruta y a partir de ahi obtener las tasks de un usuario concreto

  //Como estamos en una ruta hija cuando queremos acceder al id, tenemos ciertas limitaciones
  //para llegar a ella
  //Por ejemplo: la forma de acceder mediante input no funcionaria
  //userId= input.required<string>();  -> esto solo vale en caso de estar bajo la misma ruta no sobre rutas hijas

  //Solucion:
  //En el app.config.ts debemos especificar como segundo parámetro del provider la funcion withRouterConfig
  //AHORA SI, EL INPUT YA FUNCIONARÍA
  userId = input.required<string>();
  //Tenemos acceso al userId, ya podemos obtener las tasks de un user en concreto
  //Almacenamos en userTasks un computed con el resultado del filter sobre todas las tasks almacenadas en el taskService
  userTasks = computed(() =>
    this.tasksService.allTasks().filter((task) => task.userId === this.userId())
  );
  //Usamos el computed para que userTask se actualice siempre que el userId o tasks cambien de valor :D
  //Sin usar signals tambien se podria haciendo observables para obtener las tareas de un usuario.

  //Como obtenemos el orden que ha marcado el usuario en el link?
  //1.Con la configuración actual podemos acceder a ese parámetro con un input de su mismo nombre
  //order = input<'asc' | 'desc'>(); //con esto angular ya obtiene el parametro de la url
  //no es required porque puede que lo tengamos o no en la url

  //2.Tambien podemos acceder al valor del parámetro de la ruta mediante Observables:
  order?: 'asc' | 'desc';
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  ngOnInit() {
    const suscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        this.order = params['order']; //obtiene el valor del parámetro con este nombre de la url
      },
    });
    //Destruimos la suscripcion
    this.destroyRef.onDestroy(() => suscription.unsubscribe());
  }
  //Y funcionaría igual!-> sacariamos en la template el order() y lo cambiamos a order, porque
  //ya no es una signal y ya!!
  //Funciona igual porque al ser una suscription se ejecuta cada vez que el queryParams cambia
  //(osea, cuando el usuario hace click en otro usuario)
}
