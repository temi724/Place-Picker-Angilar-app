import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PlaceServiceService } from '../services/place-service.service';
import { Place } from '../place';

@Component({
  selector: 'app-fav-places',
  imports: [],
  templateUrl: './fav-places.component.html',
  styleUrl: './fav-places.component.css',
})
export class FavPlacesComponent implements OnInit {
  // constructor(private destroyRef: DestroyRef) {}
  private ps = inject(PlaceServiceService);
  private destroyRef = inject(DestroyRef);
  places = this.ps.loadedFavPlaces;
  isFetching = signal(false);
  error = signal('');
  // place: Place[] = [];

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.ps.getUserPlaces().subscribe({
      error: (error) => {
        this.error.set(error);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  removePlace(place: Place) {
    const subscription = this.ps.removePlaces(place).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
