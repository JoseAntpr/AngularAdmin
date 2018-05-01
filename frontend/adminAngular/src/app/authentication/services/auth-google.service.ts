import { Injectable } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';

@Injectable()
export class AuthGoogleService {

  constructor(private authService: AuthService) { }

  get authState() {
    return this.authService.authState;
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
