import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AvailablePlacesComponent } from './available-places/available-places.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AvailablePlacesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'place-picker';
}
