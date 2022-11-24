import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { UiModule } from '@ngrx-nx-workshop/ui';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, UiModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
