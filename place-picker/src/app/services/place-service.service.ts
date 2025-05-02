import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Place } from '../place';

@Injectable({
  providedIn: 'root',
})
export class PlaceServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.apiUrl}/places`);
  }
}
