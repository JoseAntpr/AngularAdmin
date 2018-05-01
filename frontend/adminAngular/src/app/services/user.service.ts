import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';

@Injectable()
export class UserService {

  public baseUrl = environment.apiUrl;
  public token = localStorage.getItem('currentUser');

  constructor( public http: HttpClient ) { }

  getUsers() {
    console.log(JSON.parse(this.token).token);
    const tokenFunc = JSON.parse(this.token).token;
    return this.http.get(`${this.baseUrl}/users`, {headers: {'Authorization': `Token ${tokenFunc}`}})
                  .map( res => {
                    console.log(res);
                    return res;
                  });

  }

}
