import { Component, inject, input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerGeneralService } from '../../services/spinner-general.service';

@Component({
  selector: 'fhv-spinner-general',
  templateUrl: './spinner-general.component.html',
  styleUrl: './spinner-general.component.scss',
})
export class SpinnerGeneralComponent implements OnInit {
  showSpinner$: Observable<boolean>;
  showSpinner = input<boolean>(false);

  protected spinnerServiceGeneral: SpinnerGeneralService = inject(
    SpinnerGeneralService
  );

  ngOnInit(): void {
    this.showSpinner$ = this.spinnerServiceGeneral.getSpinnerState();
  }
}
