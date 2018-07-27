import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { Place } from './places.models';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Place[] | any> {
    return this.http.get('places/');
  }

  getOne(id: number): Observable<Place | any> {
    return this.http.get(`places/${id}/`);
  }
}
