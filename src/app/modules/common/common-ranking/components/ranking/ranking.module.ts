import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { RankingComponent } from './ranking.component';
import { SpinnerGeneralModule } from '../../../../shared/spinner/componentes/spinner-general/spinner-general.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [RankingComponent],
  imports: [
    CommonModule,
    ProgressBarModule,
    SpinnerGeneralModule,
    TranslateModule,
  ],
})
export class RankingModule {}
