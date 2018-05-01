import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  id: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
  }

  guardar() {
    if ( this.id !== undefined ) {
      console.log('Actualizar');
    } else {
      console.log('crear');
    }
  }

}
