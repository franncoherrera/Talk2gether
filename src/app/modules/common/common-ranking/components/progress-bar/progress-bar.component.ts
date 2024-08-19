import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES_PATH } from '../../../../../shared/constants/routes';
import { RANKING_USER } from '../../../../../shared/models/ranking.model';
import { ProfileService } from '../../../common-profile/services/profile.service';

@Component({
  selector: 'fhv-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent implements AfterViewInit {
  @ViewChildren('progressBar') progressBars!: QueryList<ElementRef>;
  rankingList = input.required<RANKING_USER[]>();

  private renderer: Renderer2 = inject(Renderer2);
  protected readonly router: Router = inject(Router);
  private readonly profileService: ProfileService = inject(ProfileService);

  goProfileView(idUserProfile: number): void {
    this.profileService.saveIdUserProfile(idUserProfile);
    this.router.navigate([ROUTES_PATH.PROFILE_VIEW]);
  }

  ngAfterViewInit(): void {
    const maxNumber: number = this.rankingList().reduce(
      (max, obj) => (obj.puntosTotales > max ? obj.puntosTotales : max),
      -Infinity
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetIndex = this.progressBars
            .toArray()
            .findIndex((bar) => bar.nativeElement === entry.target);
          if (targetIndex > -1) {
            const progressData = this.rankingList()[targetIndex];
            this.renderer.setStyle(
              this.progressBars.toArray()[targetIndex].nativeElement,
              'width',
              (progressData.puntosTotales * 100) / maxNumber + '%'
            );
            observer.unobserve(entry.target);
          }
        }
      });
    });

    this.progressBars.forEach((bar: ElementRef) =>
      observer.observe(bar.nativeElement)
    );
  }
}
