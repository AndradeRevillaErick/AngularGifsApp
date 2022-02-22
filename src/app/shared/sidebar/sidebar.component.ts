import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  get historial() {
    return this.GifsService.historial;
  }

  //se injecta el serficio de GifsService
  constructor( private GifsService: GifsService ){}

  buscar(query: string){
    console.log(query);
    this.GifsService.buscarGifs(query);
  }
}
