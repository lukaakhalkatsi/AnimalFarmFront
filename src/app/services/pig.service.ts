import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PigService {
  private apiUrl = `${environment.apiUrl}/bidzina/status`;
  private messageUrl = `${environment.apiUrl}/music/toggle`;

  constructor(private http: HttpClient) {}

  getPigData(): Observable<{ initial: string; putin: string }> {
    return this.http.get<{ initial: string; putin: string }>(this.apiUrl);
  }

  sendMessage(message: string): Observable<any> {
    const body = { message };
    return this.http.post(this.messageUrl, body);
  }
}
