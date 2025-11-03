import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  //El añadido de Tasks ya funciona con lo que nos da el codigo del curso,
  //pero ahora debemos hacer que cuando creamos una task, se REDIRIJA el usuario a la ruta
  //donde muestra todas las tasks del usuario y lo mismo ocurriría con le boton de "Cancel"
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submited = false; //para determinar si el form ha sido enviado y en ese caso que no salte el guard de la path
  private tasksService = inject(TasksService);

  //Programaremos el enrutamiento del boton de crear con:
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submited= true;
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      //Objeto de configuracion
      replaceUrl: true,
      //Con esto lo que hacemos es que en caso de que el usuario añada una task
      //y se redirija, si el usuario hace click en el boton atrás del navegador
      //NO LE LLEVARÁ DE NUEVO A LA PANTALLA DE AÑADIR UNA TASK, volverá a la raiz del proyecto
      //pero no al form de añadir, esto es un comportamiento que ha puesto le profesor.
    });
    //Ahora cada vez que añadamos una task a un usuario, nos redirijirá automáticamente
    //a la pantalla anterior donde vemos todas las taks incluida la nueva task que hemos creado!
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (component) =>{

  //Más sencillo con la variable submited, para en caso de envio que ya no salga la window siguiente de confirmacion
  if(component.submited){
    return true;
  }

  if(component.enteredTitle() || component.enteredDate() || component.enteredSummary()){
    //Si alguno de estos campos tiene valor introducido por el usuario, no queremos que se vaya de la pantalla sin guardar
    return window.confirm("Do you really want to leave? Yo will lose the entered data."); //nos dará true o false
  }
  return true; //si no hay nada en los campos devolverá true, por lo que el usuario puede irse de la pantalla


}
