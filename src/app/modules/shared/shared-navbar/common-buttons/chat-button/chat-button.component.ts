import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserCometChatService } from '../../../../../shared/services/user-comet-chat.service';
import { SpinnerParticularComponent } from '../../../spinner/componentes/spinner-particular/spinner-particular.component';

@Component({
  selector: 'fhv-chat-button',
  standalone: true,
  imports: [CommonModule, SpinnerParticularComponent],
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.scss'
})
export class ChatButtonComponent implements OnInit {
  unreadQuantityMessage: number;
  private readonly userCometChatService: UserCometChatService =
    inject(UserCometChatService);
  private readonly destroy: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.userCometChatService
      .getUnreadQuantityMessage()
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe({
        next: (unreadQuantityMessage) => {
          this.unreadQuantityMessage = unreadQuantityMessage;
        },
      });
  }
}
