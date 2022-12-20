import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorTailorModule } from '@ngneat/error-tailor';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './services/auth.service';
import { RusuarioComponent } from './auth/rusuario/rusuario.component';
import { RcontraComponent } from './auth/rcontra/rcontra.component';
import { ActcontraComponent } from './auth/actcontra/actcontra.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'rusuario', component: RusuarioComponent},
  { path: 'rcontra', component: RcontraComponent},
  { path: 'actusuario', component: ActcontraComponent}

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RusuarioComponent,
    RcontraComponent,
    ActcontraComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Campo requerido',
          min: ({min, actual}) =>  `La cantidad mínima de caracteres es 6 actual ${String(actual).length}`,
          max: ({max, actual}) =>  `La cantidad máxima de caracteres es 10 actual ${String(actual).length}`,
          minlength: ({ requiredLength, actualLength }) =>
            `La cantidad mínima de caracteres es ${requiredLength} actual ${actualLength}`,
          maxlength: ({ requiredLength, actualLength }) =>
          `La cantidad máxima de caracteres es ${requiredLength} actual ${actualLength}`,
          email: (res) => {
            console.log(res);
            return `Email invalido`
          },
          invalidAddress: error => `Dirección invalida`
        }
      }
    })
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
