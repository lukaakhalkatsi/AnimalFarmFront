import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  private apiUrl = `${environment.apiUrl}/animals`;

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
