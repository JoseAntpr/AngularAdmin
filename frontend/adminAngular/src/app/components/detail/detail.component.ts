import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';
import { User } from '../../user';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  id: number;
  user: User;

  constructor(public location: Location,
              public userService: UserService,
              private activatedRoute: ActivatedRoute) {
      this.subscription.push(this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
    }));
  }

  ngOnInit() {
    if (this.id) {
      this.subscription.push(this.userService.getUser(this.id).subscribe( (user: User) => {
        this.user = user;
      }));
    }
  }

  ngOnDestroy() {
    this.subscription.forEach( observable => {
      observable.unsubscribe();
    });
  }

  goBack() {
    this.location.back();
  }

}
