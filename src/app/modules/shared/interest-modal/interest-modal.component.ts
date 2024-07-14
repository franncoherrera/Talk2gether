import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { VALIDATOR_INTEREST } from '../../../shared/constants/patterns';
import { INTEREST } from '../../../shared/models/parameter.model';
import { ParameterService } from '../../../shared/services/parameter.service';
import { FormErrorComponent } from '../form-error/form-error.component';
import { ModalComponent } from '../bootstrap-modal/bootstrap-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'fhv-interest-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, TranslateModule],
  templateUrl: './interest-modal.component.html',
  styleUrl: './interest-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class InterestModalComponent implements OnInit {
  interestList$: Observable<INTEREST[]>;
  selectedInterest: INTEREST[] = [];
  VALIDATOR_INTEREST = VALIDATOR_INTEREST;
  @Input() control: FormControl;

  constructor(
    private parameterService: ParameterService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.interestList$ = this.parameterService.getActiveInterests();
    if (this.control?.value) {
      this.selectedInterest = this.control.value;
      this.selectedInterest.forEach((interest) => this.printInterest(interest));
    }
  }

  selectInterest(id: number, interestList: INTEREST[]): void {
    const interestSelected = interestList.find(
      (interest) => interest.id === id
    );
    if (!interestSelected) return;
    const existingInterest = this.selectedInterest.find(
      (interest) => interest.id === id
    );
    if (existingInterest) {
      interestSelected.seleccionado = false;
      this.selectedInterest = this.selectedInterest.filter(
        (interest) => interest.id !== id
      );
    } else {
      this.printInterest(interestSelected);
      this.selectedInterest.push(interestSelected);
    }
    this.control.setValue([...this.selectedInterest]);
  }

  printInterest(interest: INTEREST): void {
    interest.seleccionado = true;
  }

  validateInterestSelected(interestID: number): boolean {
    return this.selectedInterest.some((interest) => interest.id === interestID);
  }

  isInterestDisabled(interestID: number): boolean {
    return (
      this.selectedInterest.length >= this.VALIDATOR_INTEREST.maxInterest &&
      !this.validateInterestSelected(interestID)
    );
  }

  onInterestClick(id: number, interestList: INTEREST[]): void {
    if (!this.isInterestDisabled(id)) {
      this.selectInterest(id, interestList);
    }
  }
}
