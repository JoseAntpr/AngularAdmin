import { Component, OnInit } from '@angular/core';
import { AuthGoogleService } from '../../authentication/services/auth-google.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userAuthenticated;

  constructor(public authService: AuthGoogleService, public router: Router) { }

  ngOnInit() {
    this.authService.authSubject.subscribe( result => {
      this.userAuthenticated = result;
    });

  }

  logout() {
    this.authService.signOut();
    console.log(localStorage.getItem('currentUser'));
    localStorage.removeItem('currentUser');
    console.log(localStorage.getItem('currentUser'));
    this.router.navigate(['/login']);
  }

}
