import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalComponent } from '../../../../shared/bootstrap-modal/bootstrap-modal.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'fhv-rate-user',
  standalone: true,
  imports: [CommonModule, ModalComponent, TranslateModule],
  templateUrl: './rate-user.component.html',
  styleUrl: './rate-user.component.scss',
})
export class RateUserComponent {}
