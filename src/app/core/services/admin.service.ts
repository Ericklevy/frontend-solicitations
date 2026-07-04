import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CoverageUpdateDTO } from '../models/user.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`; // Base URL

  constructor(private http: HttpClient) { }

  createAnalyst(user: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateAnalystCoverage(id: string, coverage: CoverageUpdateDTO): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}/coverage`, coverage);
  }

  // Not explicitly mentioned in backend README, but we need to list analysts to manage them
  getAllAnalysts(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
