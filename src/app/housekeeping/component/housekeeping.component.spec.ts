import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HousekeepingComponent } from './housekeeping.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HousekeepingComponent', () => {
  let component: HousekeepingComponent;
  let fixture: ComponentFixture<HousekeepingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HousekeepingComponent,
        RouterTestingModule,     // 🔹 Esto soluciona el NullInjectorError
        HttpClientTestingModule  // 🔹 Si usas HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HousekeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
