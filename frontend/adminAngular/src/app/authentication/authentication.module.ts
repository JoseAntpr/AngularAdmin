import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGoogleService } from './services/auth-google.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: []
})

export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [AuthGoogleService]
    };
  }
}
