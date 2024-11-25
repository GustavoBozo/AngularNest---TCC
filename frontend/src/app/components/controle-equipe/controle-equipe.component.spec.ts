import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleEquipeComponent } from './controle-equipe.component';

describe('ControleEquipeComponent', () => {
  let component: ControleEquipeComponent;
  let fixture: ComponentFixture<ControleEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControleEquipeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControleEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
