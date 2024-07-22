import { CommonModule } from '@angular/common';
import { Component, input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICON_CLASS } from '../../../../../public/assets/icons_class/icon_class';
import { INPUT_TYPE } from '../../../shared/enums/input-type.enum';
import { INTEREST } from '../../../shared/models/parameter.model';

@Component({
  selector: 'fhv-interest-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interest-label.component.html',
  styleUrl: './interest-label.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class InterestLabelComponent {
  readonly INPUT_TYPE = INPUT_TYPE;
  readonly ICON_CLASS = ICON_CLASS;
  control = input.required<FormControl>();
  activeDelete = input.required<boolean>();
  
  deleteInterest(interestName: string): void {
    const interestArray: INTEREST = this.control().value.filter(
      (value: INTEREST) => value.name !== interestName
    );
    this.control().setValue(interestArray);
  }
}
