import { Component, computed, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent{

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
  userTasks= computed(()=> this.tasksService.allTasks().filter(task=> task.userId=== this.userId()));
  //Usamos el computed para que userTask se actualice siempre que el userId o tasks cambien de valor :D
  //Sin usar signals tambien se podria haciendo observables para obtener las tareas de un usuario.

}
