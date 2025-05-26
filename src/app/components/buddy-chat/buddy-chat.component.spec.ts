import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyChatComponent } from './buddy-chat.component';

describe('BuddyChatComponent', () => {
  let component: BuddyChatComponent;
  let fixture: ComponentFixture<BuddyChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuddyChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuddyChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
