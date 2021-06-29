import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpAuthInterceptor } from './services/http-auth.interceptor';
import es from '@angular/common/locales/es';
import { AppComponent } from './views/app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
registerLocaleData(es);

@NgModule({
  declarations: [AppComponent, HeaderComponent, LoginComponent, HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: `es` },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'EUR',
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
  ],
  exports: [AppComponent],
})
export class CoreModule {}
