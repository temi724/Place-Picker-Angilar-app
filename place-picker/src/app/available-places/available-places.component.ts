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
  place = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  // place: Place[] = [];
  constructor(
    private ps: PlaceServiceService,
    private destroyRef: DestroyRef,
    private http: HttpClient
  ) {}

  // ngOnInit() {
  //   const subscription = this.ps.getPlaces().subscribe({
  //     next: (data) => {
  //       this.place = data;
  //       console.log(data);
  //     },
  //   });
  ngOnInit() {
    const subscription = this.http
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(map((response) => response.places))
      .subscribe({
        next: (data) => {
          this.place.set(data);
          console.log(data);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  // this.destroyRef.onDestroy(() => {
  //   subscription.unsubscribe();
  // });
}
