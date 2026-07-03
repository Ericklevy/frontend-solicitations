import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitationWizardComponent } from './solicitation-wizard.component';

describe('SolicitationWizardComponent', () => {
  let component: SolicitationWizardComponent;
  let fixture: ComponentFixture<SolicitationWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitationWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitationWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
