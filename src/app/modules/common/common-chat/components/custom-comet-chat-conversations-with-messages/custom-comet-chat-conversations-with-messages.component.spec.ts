import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCometChatConversationsWithMessagesComponent } from './custom-comet-chat-conversations-with-messages.component';

describe('CustomCometChatConversationsWithMessagesComponent', () => {
  let component: CustomCometChatConversationsWithMessagesComponent;
  let fixture: ComponentFixture<CustomCometChatConversationsWithMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCometChatConversationsWithMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCometChatConversationsWithMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
