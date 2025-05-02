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
  // place: Place[] = [];
  constructor(
    private ps: PlaceServiceService,
    private destroyRef: DestroyRef,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.http

      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(map((response) => response.places))
      .subscribe({
        next: (data) => {
          this.places.set(data);
          console.log(data);
        },
        complete: () => {
          this.isFetching.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
