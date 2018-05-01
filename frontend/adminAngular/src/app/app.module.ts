import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// Modules
import { MaterialModule } from './material/material.module';


import { AppComponent } from './app.component';

// Routing
import { app_routing } from './app.routes';

// Components
import { HomeComponent } from './components/home/home.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { LoginComponent } from './components/login/login.component';

// Authentication modules
import { AuthenticationModule } from './authentication/authentication.module';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider} from 'angularx-social-login';

// Environment
import { environment } from '../environments/environment';


// AuthService config
const config = new AuthServiceConfig([ environment.authConfig ]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    app_routing,
    AuthenticationModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
