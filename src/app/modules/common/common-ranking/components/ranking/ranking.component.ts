import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent  implements OnInit, AfterViewInit  {
  @ViewChildren('progressBar') progressBars!: QueryList<ElementRef>;

  progressBarsData = [
    { value: (1982*100/1982), width: '0%' },
    { value:1245*100/1982, width: '0%' },
    { value: 1195*100/1982, width: '0%' },
    { value: 835*100/1982, width: '0%' },
  ];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
      
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetIndex = this.progressBars
            .toArray()
            .findIndex((bar) => bar.nativeElement === entry.target);
          if (targetIndex > -1) {
            const progressData = this.progressBarsData[targetIndex];
            this.renderer.setStyle(
              this.progressBars.toArray()[targetIndex].nativeElement,
              'width',
              progressData.value + '%'
            );
            observer.unobserve(entry.target); // Detener la observación una vez que se anima
          }
        }
      });
    });

    this.progressBars.forEach((bar: ElementRef) =>
      observer.observe(bar.nativeElement)
    );
  }
}
