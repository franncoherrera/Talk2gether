import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest, map, of } from 'rxjs';
import { VALIDATOR_INTEREST } from '../../../shared/constants/patterns';
import { INTEREST } from '../../../shared/models/parameter.model';
import { ParameterService } from '../../../shared/services/parameter.service';
import { FormErrorComponent } from '../form-error/form-error.component';

@Component({
  selector: 'fhv-interest-modal',
  standalone: true,
  imports: [CommonModule, FormErrorComponent],
  templateUrl: './interest-modal.component.html',
  styleUrl: './interest-modal.component.scss',
})
export class InterestModalComponent implements OnInit {
  interestList$: Observable<INTEREST[]>;
  selectedInterest$: Observable<INTEREST[]>;
  combined$: Observable<{
    interestList: INTEREST[];
    selectedInterest: INTEREST[];
  }>;
  VALIDATOR_INTEREST = VALIDATOR_INTEREST;
  @Input() control: FormControl;

  constructor(private parameterService: ParameterService) {}

  ngOnInit() {
    this.interestList$ = this.parameterService.getActiveInterests();
    this.selectedInterest$ = of(
      !!this.control?.value ? this.control.value : []
    );
    this.combined$ = combineLatest([
      this.interestList$,
      this.selectedInterest$,
    ]).pipe(
      map(([interestList, selectedInterest]) => ({
        interestList,
        selectedInterest,
      }))
    );
  }

  selectInterest(
    id: number,
    interestList: INTEREST[],
    selectedInterest: INTEREST[]
  ): void {

    const interestSelected: INTEREST = interestList.find(
      (interest) => interest.id == id
    );
    if (
      selectedInterest.length > 0 &&
      selectedInterest.find((interest) => interest.id === id)
    ) {
      interestSelected.seleccionado = false;
      selectedInterest = selectedInterest.filter(
        (interest) => interest.id !== id
      );
    } else {
      interestSelected.seleccionado = true;
      selectedInterest.push(interestSelected);
    }
    this.setSelectedInterestNames(selectedInterest);
    console.log(this.control.value)
  }

  setSelectedInterestNames(selectedInterest: INTEREST[]): void {
    let interestList: INTEREST[] = [];
    for (const interest of selectedInterest) {
      interestList.push(interest);
    }
    this.control.setValue(interestList);
  }

  validateSelected(selectedInterest: INTEREST[], interestID: number): boolean {
    return selectedInterest.some((interest) => interest.id === interestID);
  }
}
