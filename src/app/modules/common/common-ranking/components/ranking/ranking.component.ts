import { Component, inject, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { RANKING_USER } from '../../../../../shared/models/ranking.model';
import { UserService } from '../../../../../shared/services/user.service';
import { RankingService } from '../../services/ranking.service';
import { Location } from '@angular/common';

@Component({
  selector: 'fhv-ranking',
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class RankingComponent implements OnInit {
  rankingUserList$: Observable<RANKING_USER[]>;
  readonly ICON_CLASS = ICON_CLASS;

  private rankingService: RankingService = inject(RankingService);
  private userService: UserService = inject(UserService);
  private location: Location = inject(Location);

  ngOnInit(): void {
    this.rankingUserList$ = this.userService
      .getIdUser()
      .pipe(switchMap((userId) => this.rankingService.getRanking(userId)));
  }

  goBack(): void {
    this.location.back();
  }
}
