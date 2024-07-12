import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MainPageService } from '../../services/main-page.service';
import { UserService } from '../../../../../shared/services/user.service';
import { map, Observable, switchMap } from 'rxjs';
import { ROOM_USER } from '../../../../../shared/models/roomUser.model';
import { CurrentUser } from '../../../../../shared/models/currentUser.model';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';
import { FormControl, FormGroup } from '@angular/forms';
import { FormService } from '../../../../../shared/services/form.service';
import { INPUT_TYPE } from '../../../../../shared/enums/input-type.enum';

@Component({
  selector: 'fhv-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainPageComponent implements OnInit {
  readonly ICON_CLASS = ICON_CLASS;
  readonly INPUT_TYPE = INPUT_TYPE;
  userRoom$: Observable<ROOM_USER[]>;
  isClassicVersion: boolean = true;
  searchForm: FormGroup;

  constructor(
    private mainPageService: MainPageService,
    private userService: UserService,
    protected formService: FormService
  ) {}

  ngOnInit() {
    this.setCardVersion();
    this.searchForm = new FormGroup(
      {
        search: new FormControl(''),
      },
      {
        updateOn: 'change',
      }
    );
    this.userRoom$ = this.userService.getCurrentUser().pipe(
      map<CurrentUser, number>((user) => user.id),
      switchMap<number, Observable<ROOM_USER[]>>((userId) =>
        this.mainPageService.searchRoom(userId)
      )
    );
  }

  setCardVersion(): void {
    if (
      localStorage.getItem('cardVersion') !== 'classicVersion' &&
      !!localStorage.getItem('cardVersion')
    ) {
      this.isClassicVersion = false;
    } else {
      localStorage.setItem('cardVersion', 'classicVersion');
    }
  }

  changeCardVersion(): void {
    if (this.isClassicVersion) {
      localStorage.setItem('cardVersion', 'modernVersion');
    } else {
      localStorage.setItem('cardVersion', 'classicVersion');
    }
    this.isClassicVersion = !this.isClassicVersion;
  }
}
