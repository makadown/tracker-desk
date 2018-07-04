import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Choferes';
  lat = 32.678418;
  lng = -115.3882286;
  init = false;

  siguiendoA: any = null;
  siguiendoNombre: string = null;

  items: Chofer[] = [];

  constructor(db: AngularFirestore) {
      db.collection('usuarios')
            .valueChanges()
            .subscribe ( (data: Chofer[]) => {
                this.items = data;
                if ( !this.init ) {
                  /*
                  en firebase estan en string, pero aqui me lo pide number,
                  con el operador + me deja parsearlo a numero.
                  */
                  this.lat = +data[0].lat;
                  this.lng = +data[0].lon;
                }

                if ( this.siguiendoA ) {
                  data.forEach( chofer => {
                    if (chofer.clave === this.siguiendoA) {
                        this.actualizarPosicion(chofer);
                    }
                  });
                }
            });
  }

  actualizarPosicion(chofer: Chofer) {
    this.lat = +chofer.lat;
    this.lng = +chofer.lon;
  }

  seguir( chofer: Chofer ) {
    this.siguiendoA = chofer.clave;
    this.siguiendoNombre = chofer.nombre;
    this.actualizarPosicion(chofer);
  }

  dejarDeSeguir() {
    this.siguiendoA = null;
    this.siguiendoNombre = null;
  }

}



interface Chofer {
  nombre: string;
  clave: string;
  lat: number;
  lon: number;
}
