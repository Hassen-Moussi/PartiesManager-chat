import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = environment.apiUrl + '/profiles';

  constructor(private http: HttpClient) {}

  getAllProfiles(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  createProfile(name: string): Observable<any> {
    return this.http.post(this.baseUrl, { name });
  }
}
