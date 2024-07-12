import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModernCardComponent } from './modern-card.component';



@NgModule({
  declarations: [ModernCardComponent],
  imports: [
    CommonModule
  ],
  exports: [ModernCardComponent]
})
export class ModernCardModule { }
