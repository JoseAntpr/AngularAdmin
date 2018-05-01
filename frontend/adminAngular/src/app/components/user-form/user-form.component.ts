import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  id: string;
  form: FormGroup;
  user;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              public fb: FormBuilder,
              private userService: UserService) {

              this.activatedRoute.params.subscribe( params => {
                this.id = params['id'];
              });
  }

  ngOnInit() {

    if (this.id === undefined) {

    } else {
      this.userService.getUser(this.id).subscribe( user => {
        this.user = user;
      });
    }

    this.form = this.fb.group({
      'first_name': '',
      'last_name': '',
      'iban': ''
    });
  }

  guardar() {
    console.log(this.form.value);
    if ( this.id !== undefined ) {
      console.log('Actualizar');
    } else {
      console.log('crear');
    }
  }

}
