import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  id: string;
  form: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              public fb: FormBuilder) {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {

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
