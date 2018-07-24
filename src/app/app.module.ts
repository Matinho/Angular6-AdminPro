import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Temporal - hay que sacarlo
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app.routes';

// Modulos
import { SharedModule } from './shared/shared.module';

// Services
import { ServiceModule } from './services/service.module';
import { HttpClientModule } from '@angular/common/http';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    ServiceModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
