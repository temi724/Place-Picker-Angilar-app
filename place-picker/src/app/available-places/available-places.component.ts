import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { PlaceServiceService } from '../services/place-service.service';
import { Place } from '../place';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { map } from 'rxjs';

@Component({
  selector: 'app-available-places',
  imports: [],
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  // place: Place[] = [];
  constructor(
    private ps: PlaceServiceService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.ps.getPlaces().subscribe({
      next: (data) => {
        this.places.set(data);
      },
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

  saveSelectedPlace(place: Place) {
    this.ps.saveSelectedLocation(place.id).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
