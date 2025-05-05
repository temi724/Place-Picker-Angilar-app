import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AvailablePlacesComponent } from './available-places/available-places.component';
import { FavPlacesComponent } from './fav-places/fav-places.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    AvailablePlacesComponent,
    FavPlacesComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'place-picker';
}
