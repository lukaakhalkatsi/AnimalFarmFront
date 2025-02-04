import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private baseUrl = `${environment.apiUrl}/animals`;

  constructor(private http: HttpClient) {}

  sendFoodSelection(animalId: string, food: string): Observable<any> {
    const url = `${this.baseUrl}/${animalId}/feed`;
    const payload = { food };

    return this.http.post(url, payload);
  }
}
