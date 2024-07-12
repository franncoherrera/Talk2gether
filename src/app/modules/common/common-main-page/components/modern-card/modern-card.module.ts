import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModernCardComponent } from './modern-card.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ModernCardComponent],
  imports: [CommonModule, NgxPaginationModule],
  exports: [ModernCardComponent],
})
export class ModernCardModule {}
