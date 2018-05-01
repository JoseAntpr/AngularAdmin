import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

  public baseUrl = environment.apiUrl;
  public token = localStorage.getItem('currentUser');

  constructor( public http: HttpClient ) { }

  getUsers() {
    return this.http.get(`${this.baseUrl}/users`, {headers: {'Authorization': `Token ${this.token}`}})
                  .map( res => {
                    console.log(res);
                    return res;
                  });

  }

}
