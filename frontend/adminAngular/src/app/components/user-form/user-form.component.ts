import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnDestroy {

  id: string;
  form = this.fb.group({
    'first_name': ['', [Validators.required]],
    'last_name': ['', [Validators.required]],
    'iban': ['', [Validators.required]]
  });
  user;
  subscription: Subscription[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              public fb: FormBuilder,
              private userService: UserService) {

              this.subscription.push(this.activatedRoute.params.subscribe( params => {
                this.id = params['id'];
              }));
  }

  ngOnInit() {
    if (this.id) {
      this.subscription.push(this.userService.getUser(this.id).subscribe( user => {
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
    console.log(this.form.value);
    if ( this.id !== undefined ) {
      console.log('Actualizar');
    } else {
      this.userService.createUser(this.form.value).subscribe( () => {
        console.log('User saved');
        this.router.navigate(['/home']);
      });
    }
  }

}
