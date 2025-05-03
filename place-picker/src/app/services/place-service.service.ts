import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Place } from '../place';

@Injectable({
  providedIn: 'root',
})
export class PlaceServiceService {
  private apiUrl = environment.apiUrl;
  private places = signal<Place[] | undefined>([]);

  constructor(private http: HttpClient) {}
  getPlaces() {
    return this.fetchPlaces(`${this.apiUrl}/places`, 'please retry');
  }

  saveSelectedLocation(placeId: string) {
    return this.http.put(`${this.apiUrl}/user-places`, { placeId });
  }

  private fetchPlaces(url: string, erroMessage: string) {
    return this.http.get<{ places: Place[] }>(url).pipe(
      map((response) => response.places),
      catchError((error) => {
        console.error(error);
        // this.places.set(undefined);
        return throwError(() => new Error(erroMessage));
      })
    );
  }
}
