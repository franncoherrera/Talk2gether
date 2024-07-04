import { Component } from '@angular/core';
import { ICON_CLASS } from '../../../../../../../public/assets/icons_class/icon_class';

@Component({
  selector: 'fhv-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrl: './terms-condition.component.scss',
})
export class TermsConditionComponent {
  readonly ICON_CLASS = ICON_CLASS;

  closeTermsAndConditions() {
    window.self.close();
  }
}
