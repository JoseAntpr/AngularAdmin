import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../../user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

  id: number;
  form = this.formBuilder.group({
    'first_name': ['', [Validators.required]],
    'last_name': ['', [Validators.required]],
    'iban': ['', [Validators.required]]
  });
  user: User;
  subscription: Subscription[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              public formBuilder: FormBuilder,
              private userService: UserService,
              public location: Location,
              public snackBar: MatSnackBar) {

              this.subscription.push(this.activatedRoute.params.subscribe( params => {
                this.id = params['id'];
              }));
  }

  ngOnInit() {
    if (this.id) {
      this.subscription.push(this.userService.getUser(this.id).subscribe( (user: User) => {
        this.user = user;
        if (this.user) {
          this.form.patchValue({'first_name': this.user.first_name, 'last_name': this.user.last_name, 'iban': this.user.iban});
        }
      }));
    }
  }

  ngOnDestroy() {
    this.subscription.forEach( observable => {
      observable.unsubscribe();
    });
  }

  save() {
    if (this.form.valid) {
      if ( this.id !== undefined ) {
        if ( this.user.own ) {
          this.userService.updateUser(this.id, this.form.value).subscribe(() => {
            console.log('User updated');
            this.snackBar.open('User updated ', 'Close', {duration: 2000});
            this.router.navigate(['/home']);
          }, (err) => {
            if (err.error.iban) {
              this.snackBar.open(err.error.iban[0], 'Close', {duration: 2000});
            }
          });
        } else {
          this.snackBar.open('You can`t update this user. ', 'Close', {duration: 2000});
        }
      } else {
        this.userService.createUser(this.form.value).subscribe( () => {
          console.log('User saved');
          this.snackBar.open('Users created ', 'Close', {duration: 2000});
          this.router.navigate(['/home']);
        }, (err) => {
          if (err.error.iban) {
            this.snackBar.open(err.error.iban[0], 'Close', {duration: 2000});
          }
        });
      }

    }
  }

  cancel() {
    this.location.back();
  }

}
