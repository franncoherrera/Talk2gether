import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicCardComponent } from './classic-card.component';

@NgModule({
  declarations: [ClassicCardComponent],
  imports: [CommonModule],
  exports: [ClassicCardComponent],
})
export class ClassicCardModule {}
