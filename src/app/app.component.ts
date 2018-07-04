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
  lat = 51.678418;
  lng = 7.809007;

  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('usuarios').valueChanges();
  }

}
