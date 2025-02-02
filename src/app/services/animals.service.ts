// src/app/services/animals.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  private apiUrl = 'http://localhost:3000/api/animals'; // Replace with the actual API URL

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
