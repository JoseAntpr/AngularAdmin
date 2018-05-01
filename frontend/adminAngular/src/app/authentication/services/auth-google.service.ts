import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthGoogleService {

  public authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public authObser = this.authSubject.asObservable();

  constructor(private authService: AuthService) { }

  get authState() {
    return this.authService.authState;
  }

  getAuthenticate() {
    localStorage.getItem('currentUser') !==  null ? this.authSubject.next(true) :  this.authSubject.next(false);
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authSubject.next(true);
  }

  signOut(): void {
    this.authService.signOut();
    this.authSubject.next(false);
  }

}
