import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  users;
  subscription: Subscription[] = [];

  constructor(public userService:  UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  ngOnDestroy() {
    this.subscription.forEach( observable => {
      observable.unsubscribe();
    });
  }

  delete(id: string) {
    this.subscription.push(this.userService.deleteUser(id).subscribe(()  => {
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
