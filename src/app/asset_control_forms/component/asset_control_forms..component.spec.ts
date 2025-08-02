import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetControlFormsComponent } from './asset_control_forms.component';

describe('DocumentationComponent', () => {
  let component: AssetControlFormsComponent;
  let fixture: ComponentFixture<AssetControlFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetControlFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetControlFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
