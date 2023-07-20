import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlaylistModalComponent } from './add-playlist-modal.component';

describe('AddPlaylistModalComponent', () => {
  let component: AddPlaylistModalComponent;
  let fixture: ComponentFixture<AddPlaylistModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlaylistModalComponent]
    });
    fixture = TestBed.createComponent(AddPlaylistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
