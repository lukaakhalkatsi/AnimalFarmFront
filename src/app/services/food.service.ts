import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private baseUrl = 'http://localhost:3000/api/animals';

  constructor(private http: HttpClient) {}

  sendFoodSelection(animalId: string, food: string): Observable<any> {
    const url = `${this.baseUrl}/${animalId}/feed`;
    const payload = { food };

    return this.http.post(url, payload);
  }
}
