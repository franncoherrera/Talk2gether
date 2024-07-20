import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClassicCardComponent } from '../classic-card/classic-card.component';
import { ModernCardComponent } from '../modern-card/modern-card.component';
import { GeneralCardComponent } from './general-card.component';

@NgModule({
  declarations: [GeneralCardComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ClassicCardComponent,
    ModernCardComponent,
  ],
  exports: [GeneralCardComponent],
})
export class GeneralCardModule {}
