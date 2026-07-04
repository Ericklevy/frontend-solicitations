import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Solicitation, DecideRequest } from '../models/solicitation.model';

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
}

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalystService {
  private apiUrl = `${environment.apiUrl}/analyst/solicitations`;

  constructor(private http: HttpClient) {}

  search(filters: any): Observable<PaginatedResponse<Solicitation>> {
    let params = new HttpParams();
    
    // Status filters
    if (filters.status && filters.status.length > 0) {
      filters.status.forEach((st: string) => {
        params = params.append('status', st);
      });
    } else {
      params = params.set('status', 'SUBMITTED').append('status', 'IN_REVIEW');
    }
      
    if (filters.q) params = params.set('q', filters.q);
    if (filters.serviceType) params = params.set('serviceType', filters.serviceType);
    if (filters.priority) params = params.set('priority', filters.priority);
    if (filters.dateFrom) params = params.set('dateFrom', filters.dateFrom);
    if (filters.dateTo) params = params.set('dateTo', filters.dateTo);
    if (filters.page !== undefined) params = params.set('page', filters.page);
    if (filters.size !== undefined) params = params.set('size', filters.size);

    return this.http.get<any>(`${this.apiUrl}/search`, { params }).pipe(
      map(res => {
        if (res && Array.isArray(res.items)) {
          return { items: res.items, total: res.total || res.items.length, page: res.page || 0, size: res.size || 10 };
        }
        if (res && Array.isArray(res.content)) {
          return { items: res.content, total: res.totalElements || res.content.length, page: res.number || 0, size: res.size || 10 };
        }
        if (Array.isArray(res)) {
          return { items: res, total: res.length, page: 0, size: res.length || 10 };
        }
        return { items: [], total: 0, page: 0, size: 10 };
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
