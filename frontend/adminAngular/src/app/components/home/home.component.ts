import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users;

  constructor(public userService:  UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      console.log('users');
      this.users = users;
    });
  }

}
