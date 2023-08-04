import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header.component";
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, FormsModule, MatChipsModule, MatIconModule]
})
export class HeaderModule {}
