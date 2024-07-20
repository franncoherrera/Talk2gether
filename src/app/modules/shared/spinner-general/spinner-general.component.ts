import { Component, input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerGeneralService } from './spinner-general.service';

@Component({
  selector: 'fhv-spinner-general',
  templateUrl: './spinner-general.component.html',
  styleUrl: './spinner-general.component.scss',
})
export class SpinnerGeneralComponent implements OnInit {
  showSpinner$: Observable<boolean>;
  showSpinner = input<boolean>(false);
  
  constructor(protected spinnerServiceGeneral: SpinnerGeneralService) {}

  ngOnInit(): void {
    this.showSpinner$ = this.spinnerServiceGeneral.getSpinnerState();
  }
}
