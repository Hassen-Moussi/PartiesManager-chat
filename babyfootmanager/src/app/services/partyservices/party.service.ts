import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Party } from '../../Models/Parties';



@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private apiUrl = 'http://localhost:3000/parties';

  constructor(private http: HttpClient) { }

  // Create a new party
  createParty(name: string): Observable<Party> {
    return this.http.post<Party>(this.apiUrl, { name });
  }

  // Delete a party
  deleteParty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Update a party
  updateParty(id: number, state: boolean): Observable<Party> {
    return this.http.put<Party>(`${this.apiUrl}/${id}`, { state });
  }

  // Get all parties
  getParties(): Observable<Party[]> {
    return this.http.get<Party[]>(this.apiUrl);
  }
}