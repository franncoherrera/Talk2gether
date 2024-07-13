import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { SpinnerGeneralModule } from '../../../../shared/spinner-general/spinner-general.module';
import { ClassicCardModule } from '../classic-card/classic-card.module';
import { FiltersComponent } from '../filters/filters.component';
import { ModernCardModule } from '../modern-card/modern-card.module';
import { MainPageComponent } from './main-page.component';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    ModernCardModule,
    ClassicCardModule,
    InputFormComponent,
    TranslateModule,
    SpinnerGeneralModule,
    FiltersComponent,
  ],
})
export class MainPageModule {}
