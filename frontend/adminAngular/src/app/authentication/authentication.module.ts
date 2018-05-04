import { NgModule, ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGoogleService } from './services/auth-google.service';
import { TokenInterceptor } from './interceptors/token-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { UnathorizedInterceptor } from './interceptors/unathorized-interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthGuard]
})

export class AuthenticationModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthenticationModule,
      providers: [
        AuthGoogleService,
        AuthGuard,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: UnathorizedInterceptor,
          multi: true
        }
      ]
    };
  }
}
