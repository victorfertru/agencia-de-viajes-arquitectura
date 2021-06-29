import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './core/views/app.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, CoreModule],

  bootstrap: [AppComponent],
})
export class AppModule {}
