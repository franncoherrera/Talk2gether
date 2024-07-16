import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { ROUTES_PATH } from '../../../shared/constants/routes';
import { loggedGuard } from '../../../shared/guards/logged.guard';
import { RankingComponent } from './components/ranking/ranking.component';
import { RankingModule } from './components/ranking/ranking.module';

export const RANKING_ROUTES: Routes = [
  {
    path: ROUTES_PATH.RANKING_PAGE,
    component: RankingComponent,
    canActivate: [loggedGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RankingModule],
  providers: [provideRouter(RANKING_ROUTES)],
})
export class CommonRankingModule {}
