import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    MatInputModule,
    MatToolbarModule
  ],
  declarations: []
})
export class MaterialModule { }
