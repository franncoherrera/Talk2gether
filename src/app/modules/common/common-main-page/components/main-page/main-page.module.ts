import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputFormComponent } from '../../../../shared/input-form/input-form.component';
import { SpinnerGeneralModule } from '../../../../shared/spinner/componentes/spinner-general/spinner-general.module';
import { FiltersComponent } from '../filters/filters.component';
import { GeneralCardModule } from '../general-card/general-card.module';
import { MainPageComponent } from './main-page.component';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    InputFormComponent,
    TranslateModule,
    SpinnerGeneralModule,
    FiltersComponent,
    GeneralCardModule
  ],
})
export class MainPageModule {}
