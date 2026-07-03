import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystProvidersComponent } from './analyst-providers.component';

describe('AnalystProvidersComponent', () => {
  let component: AnalystProvidersComponent;
  let fixture: ComponentFixture<AnalystProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalystProvidersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalystProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
