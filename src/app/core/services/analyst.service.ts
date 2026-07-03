import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Solicitation, DecideRequest } from '../models/solicitation.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalystService {
  private apiUrl = `${environment.apiUrl}/analyst/solicitations`;

  constructor(private http: HttpClient) {}

  search(query?: string): Observable<Solicitation[]> {
    let params = new HttpParams();
    if (query) {
      params = params.set('q', query);
    }
    return this.http.get<any>(`${this.apiUrl}/search`, { params }).pipe(
      map(res => {
        if (Array.isArray(res)) return res;
        if (res && Array.isArray(res.items)) return res.items;
        if (res && Array.isArray(res.content)) return res.content;
        return [];
      })
    );
  }

  startAnalysis(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/start`, {});
  }

  decide(id: string, request: DecideRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/decide`, request);
  }
}
