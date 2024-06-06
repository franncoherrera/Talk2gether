import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BreakPointService } from '../../../shared/services/break-point.service';

@Component({
  selector: 'fhv-home-page',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent {
  constructor(private breakPointService: BreakPointService) {}

  ngOnInit(){
    this.breakPointService.currentBreakpoint.subscribe(console.log)
  }
}
