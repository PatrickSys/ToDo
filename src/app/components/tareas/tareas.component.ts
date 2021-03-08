import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/models/Tarea';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})

export class TareasComponent implements OnInit {
  tareas: Tarea[] = []
  tareasCompletadas: Tarea[] = []
  nombreTarea = '';
  visible = false;
  index = 0;
  indiceAntiguo = 0;
  

  constructor() { 
    
  }

  //recupera las tareas al entrar
  ngOnInit(): void {   
  this.recuperarTareas();
  }

  agregarTarea(){

    // Creamos un objeto tarea
    const tarea: Tarea = {
      nombre: this.nombreTarea,
    }

    //comprobamos que el nombre tenga una extensión mínima de 5 caracteres
    // y si es así, lo agregamos al array
    if(this.nombreTarea.length<5){
      alert("Por favor, introduce una tarea más descriptiva")
    }

    else{
    this.tareas.push(tarea);
    this.resetForm();
    }
    
  }

  //elimina la tarea del array
  eliminarTarea(index: number): void{
    this.tareas.splice(index, 1);
  }

  eliminarTareaCompletada(index: number): void{
    this.tareasCompletadas.splice(index, 1);
  }

  //cambia la tarea al array de completadas
  tareaCompletada(tarea: Tarea, index: number): void{
    this.tareasCompletadas.push(tarea);
    this.tareas.splice(index, 1);
    this.indiceAntiguo = index;
  }

  //almacena las tareas
  guardarTareas(){

    localStorage.setItem("tareas", JSON.stringify(this.tareas));
    localStorage.setItem("tareasCompletadas", JSON.stringify(this.tareasCompletadas));
 
  }

  //recupera las tareas almacenadas
  recuperarTareas(){
    
    this.tareas = JSON.parse(localStorage.getItem("tareas") || "[]");
    this.tareasCompletadas = JSON.parse(localStorage.getItem("tareasCompletadas") || "[]");

  }
  
  //cambia el nombre de la tarea
  editarTarea() {
    
    this.tareas[this.index].nombre = this.nombreTarea;
    this.resetForm();
    
  }

  //mediante property binding recibe el indice de tarea a editar y lo asigna a la variable de clase index
  setIndex(index: number){
    this.index=index;
  }

  //vacía el formulario
  resetForm(){
    
    this.nombreTarea = "";
  }

  //devuelve una tarea completada a su posición original
  devolverTarea(tarea: Tarea){

    this.moveItem(0,2, tarea)

  }

  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tareas, event.previousIndex, event.currentIndex);
}
dropped(event: CdkDragDrop<string[]>) {
  moveItemInArray(
     this.tareas, 
     event.previousIndex, 
     event.currentIndex
    );
  }
  
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  
  //mueve la posición de una tarea completada a su índice original
   moveItem(from, to, tarea: Tarea) {
    
    var data = this.tareas;
    
  
    var f = this.tareasCompletadas.splice(this.tareasCompletadas.indexOf(tarea), 1)[0];
  
    data.splice(this.indiceAntiguo, 0, f);
    
  }
}

  
