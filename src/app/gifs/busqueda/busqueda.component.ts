import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  //el signo de adminiracion es para asegurarse que un valor no sea null
  //se le conoce como non-null assertion operator
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor( private GifsService: GifsService ){}

  buscar(){
    const valor = this.txtBuscar.nativeElement.value;
    
    if ( valor.trim().length === 0){
      return;
    }

    this.GifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }

}
