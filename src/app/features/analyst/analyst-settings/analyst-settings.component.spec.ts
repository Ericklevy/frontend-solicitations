import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystSettingsComponent } from './analyst-settings.component';

describe('AnalystSettingsComponent', () => {
  let component: AnalystSettingsComponent;
  let fixture: ComponentFixture<AnalystSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalystSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalystSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
