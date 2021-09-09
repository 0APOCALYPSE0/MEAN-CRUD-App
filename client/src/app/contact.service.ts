import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl:string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //retrieving contacts
  getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`);
  }

  //adding contact
  addContact(newContact: { first_name: string, last_name: string, phone: string }): Observable<string>{
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post<string>(`${this.apiUrl}/contact`, newContact, { headers:  headers });
  }

  //deleting contact
  deleteContact(id: string): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/contact/${id}`);
  }

}
