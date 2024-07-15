import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { RANKING_USER } from '../../../../../shared/models/ranking.model';
import { BreakPointService } from '../../../../../shared/services/break-point.service';

@Component({
  selector: 'fhv-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent implements AfterViewInit {
  @ViewChildren('progressBar') progressBars!: QueryList<ElementRef>;
  @Input() rankingList: RANKING_USER[];

  constructor(
    private renderer: Renderer2,
    protected breakPointService: BreakPointService
  ) {}

  ngAfterViewInit(): void {
    const maxNumber: number = this.rankingList.reduce(
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
            const progressData = this.rankingList[targetIndex];
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
