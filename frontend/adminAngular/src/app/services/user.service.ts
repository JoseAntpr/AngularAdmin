import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import { User } from '../user';

@Injectable()
export class UserService {

  public baseUrl = environment.apiUrl;

  constructor( public http: HttpClient ) { }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`)
                  .map( res => {
                    return res;
                  });

  }

  getUser( id: number) {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }

  createUser( user: any) {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  updateUser( id: number, user: User) {
    return this.http.put(`${this.baseUrl}/users/${id}`, user);
  }

}
