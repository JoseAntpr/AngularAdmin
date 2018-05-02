import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { User } from '../../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

  id: number;
  form = this.fb.group({
    'first_name': ['', [Validators.required]],
    'last_name': ['', [Validators.required]],
    'iban': ['', [Validators.required]]
  });
  user: User;
  subscription: Subscription[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              public fb: FormBuilder,
              private userService: UserService,
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

  guardar() {
    if (this.form.valid) {
      if ( this.id !== undefined ) {
        if ( this.user.own ) {
          this.userService.updateUser(this.id, this.form.value).subscribe(() => {
            console.log('User updated');
            this.snackBar.open('User updated ', 'Close', {duration: 1000});
            this.router.navigate(['/home']);
          });
        } else {
          this.snackBar.open('You can`t update this user. ', 'Close', {duration: 1000});
        }
      } else {
        this.userService.createUser(this.form.value).subscribe( () => {
          console.log('User saved');
          this.snackBar.open('Users created ', 'Close', {duration: 1000});
          this.router.navigate(['/home']);
        });
      }

    }
  }

}
