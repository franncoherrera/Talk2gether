import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { ModernCardModule } from '../modern-card/modern-card.module';
import { ClassicCardModule } from '../classic-card/classic-card.module';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    ModernCardModule,
    ClassicCardModule,
    InputFormComponent,
    TranslateModule
  ],
})
export class MainPageModule {}
