import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionistaComponent } from './recepcionista.component';

describe('RecepcionistaComponent', () => {
  let component: RecepcionistaComponent;
  let fixture: ComponentFixture<RecepcionistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecepcionistaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecepcionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
