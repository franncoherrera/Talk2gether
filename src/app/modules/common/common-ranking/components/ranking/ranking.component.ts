import { Component, OnInit } from '@angular/core';
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

  constructor(
    private rankingService: RankingService,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.rankingUserList$ = this.userService
      .getIdUser()
      .pipe(switchMap((userId) => this.rankingService.getRanking(userId)));
  }

  goBack(): void {
    this.location.back();
  }
}
