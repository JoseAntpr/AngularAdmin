import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

// Material Modules

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule
  ],
  declarations: []
})
export class MaterialModule { }
