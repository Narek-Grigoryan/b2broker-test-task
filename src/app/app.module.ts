import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HeaderModule} from "./components/header/header.module";
import {provideAnimations} from "@angular/platform-browser/animations";
import { TableComponent } from './components/table/table.component';
import {TableModule} from "./components/table/table.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    TableModule
  ],
  providers: [provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
