import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassicCardComponent } from './classic-card.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ClassicCardComponent],
  imports: [CommonModule, NgxPaginationModule],
  exports: [ClassicCardComponent],
})
export class ClassicCardModule {}
