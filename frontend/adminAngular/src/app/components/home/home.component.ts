import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  users;
  subscription: Subscription[] = [];

  constructor(public userService:  UserService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.forEach( observable => {
      observable.unsubscribe();
    });
  }

  delete(user) {
    this.subscription.push(this.userService.deleteUser(user.id).subscribe(()  => {
      this.snackBar.open(`User ${user.first_name} deleted `, 'Close', {duration: 1000});
      this.getUsers();
    }));
  }

  getUsers() {
    this.subscription.push(this.userService.getUsers().subscribe(users => {
      console.log('users');
      this.users = users;
    }));
  }

}
