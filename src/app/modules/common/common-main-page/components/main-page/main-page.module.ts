import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { ModernCardModule } from '../modern-card/modern-card.module';
import { ClassicCardModule } from '../classic-card/classic-card.module';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerGeneralModule } from '../../../../shared/spinner-general/spinner-general.module';
import { FiltersModule } from '../filters/filters.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    ModernCardModule,
    ClassicCardModule,
    InputFormComponent,
    TranslateModule,
    SpinnerGeneralModule,
    FiltersModule,
  ],
})
export class MainPageModule {}
