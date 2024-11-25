import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadadosComponent } from './metadados.component';

describe('MetadadosComponent', () => {
  let component: MetadadosComponent;
  let fixture: ComponentFixture<MetadadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetadadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetadadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
