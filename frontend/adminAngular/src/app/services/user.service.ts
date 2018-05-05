import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable} from 'rxjs/Observable';
import { User } from '../user';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

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
    return this.http.post(`${this.baseUrl}/users`, user)
      .pipe(
        catchError(err => {
        return Observable.throw(err);
      }));
  }

  updateUser( id: number, user: User) {
    return this.http.put(`${this.baseUrl}/users/${id}`, user)
      .pipe(
        catchError(err => {
        return Observable.throw(err);
      }));
  }

}
