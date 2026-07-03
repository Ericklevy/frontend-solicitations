import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solicitation, Step1Request, Step2Request, Step3Request } from '../models/solicitation.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitationService {
  private apiUrl = `${environment.apiUrl}/solicitations`;

  constructor(private http: HttpClient) {}

  createDraft(): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.apiUrl, {});
  }

  saveStep1(id: string, request: Step1Request): Observable<Solicitation> {
    return this.http.patch<Solicitation>(`${this.apiUrl}/${id}/step1`, request);
  }

  saveStep2(id: string, request: Step2Request): Observable<Solicitation> {
    return this.http.patch<Solicitation>(`${this.apiUrl}/${id}/step2`, request);
  }

  saveStep3(id: string, request: Step3Request): Observable<Solicitation> {
    return this.http.patch<Solicitation>(`${this.apiUrl}/${id}/step3`, request);
  }

  submit(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/submit`, {});
  }

  getMySolicitations(): Observable<Solicitation[]> {
    return this.http.get<Solicitation[]>(this.apiUrl);
  }
}
