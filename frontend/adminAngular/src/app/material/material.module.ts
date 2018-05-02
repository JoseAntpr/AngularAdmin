import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';


// Material Modules

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule { }
