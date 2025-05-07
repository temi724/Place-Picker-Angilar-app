import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Place } from '../place';

@Injectable({
  providedIn: 'root',
})
export class PlaceServiceService {
  private apiUrl = environment.apiUrl;
  private places = signal<Place[]>([]);
  loadedFavPlaces = this.places.asReadonly();

  constructor(private http: HttpClient) {}
  getPlaces() {
    return this.fetchPlaces(`${this.apiUrl}/places`, 'please retry');
  }

  getUserPlaces() {
    return this.fetchPlaces(`${this.apiUrl}/user-places`, 'please retry').pipe(
      tap((places) => {
        this.places.set(places);
      })
    );
  }

  removePlaces(place: Place) {
    const prevPlaces = this.places();
    this.places.set(prevPlaces.filter((p) => p.id !== place.id));

    return this.http.delete(`${this.apiUrl}/user-places/${place.id}`).pipe(
      catchError((error) => {
        this.places.set(prevPlaces);
        return throwError(() => new Error('please retry'));
      })
    );
  }

  saveSelectedLocation(place: Place) {
    const prevPlaces = this.places();
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.places.set([...prevPlaces, place]);
    }

    return this.http
      .put(`${this.apiUrl}/user-places`, { placeId: place.id })
      .pipe(
        catchError((error) => {
          this.places.set(prevPlaces);
          return throwError(() => new Error('please retry'));
        })
      );
  }

  private fetchPlaces(url: string, erroMessage: string) {
    return this.http.get<{ places: Place[] }>(url).pipe(
      map((response) => response.places),
      catchError((error) => {
        return throwError(() => new Error(erroMessage));
      })
    );
  }
}
