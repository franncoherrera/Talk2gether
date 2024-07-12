import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { ModernCardModule } from '../modern-card/modern-card.module';
import { ClassicCardModule } from '../classic-card/classic-card.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, ModernCardModule, ClassicCardModule],
})
export class MainPageModule {}
