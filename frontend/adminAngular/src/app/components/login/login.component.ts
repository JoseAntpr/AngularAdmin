import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthGoogleService } from '../../authentication/services/auth-google.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(public authService: AuthGoogleService, public router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.signInWithGoogle();
    this.subscription = this.authService.authState.subscribe(token => {
      if (token) {
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify({ token: token.idToken}));
        console.log(token);
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
