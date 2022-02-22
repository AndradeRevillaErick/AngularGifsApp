import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'LyejETy80NmI2bxJ1A9mP6pJqAQ6XOuG';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  
  private _historial: string[] = [];
  private _resultado: Gif[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ){

    //para guardar la informacion en localStorage se puede hacer de dos formas
    //de esta fora
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')! ) || [];
    //console.log(this._resultado);
    //this.buscarGifs(this._resultado);
    //o de esta otra forma
    // if( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }
  }

  buscarGifs( query: string) {

    query = query.trim().toLocaleLowerCase();

    if ( !this._historial.includes( query ) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem( 'historial', JSON.stringify( this._historial )  );
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', query);

    //una vez que se crea la interfaz para recibir la respuesta de la peticion get ahora en
    //la peticion get se tiene que especificar el tipo de dato que va a recibir y esto va en <>
    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
      .subscribe( ( resp ) => {
        this.resultados = resp.data;
        localStorage.setItem( 'resultados', JSON.stringify( this.resultados ) );
      })
    
  }
}
