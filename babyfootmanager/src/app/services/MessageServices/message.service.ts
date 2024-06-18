import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environment';
import { Message } from 'src/app/Models/Message';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = environment.apiUrl + '/messages';

  constructor(private http: HttpClient) {}

  getAllMessages(senderId: number, receiverId: number): Observable<Message[]> {
    const url = `${this.baseUrl}?senderId=${senderId}&receiverId=${receiverId}`;
    return this.http.get<Message[]>(url);
  }

  sendMessage(message: Message): Observable<any> {
    return this.http.post(this.baseUrl, message);
  }
}
