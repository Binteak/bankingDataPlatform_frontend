import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    routerSpy = jasmine.createSpyObj(
      'Router',
      ['navigate']
    );

    await TestBed.configureTestingModule({

      imports: [
        LoginComponent
      ],

      providers: [
        {
          provide: Router,
          useValue: routerSpy
        }
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  // ==========================================================
  // TEST 1 — COMPONENT CREATION
  // ==========================================================

  it('should create', () => {

    expect(component).toBeTruthy();

  });


  // ==========================================================
  // TEST 2 — VALID CREDENTIALS
  // ==========================================================

  it('should navigate to dashboard with valid credentials', () => {

    component.username = 'admin';
    component.password = '1234';

    component.onLogin();

    expect(routerSpy.navigate)
      .toHaveBeenCalledWith(['/dashboard']);

  });


  // ==========================================================
  // TEST 3 — INVALID CREDENTIALS
  // ==========================================================

  it('should show an error message with invalid credentials', () => {

    component.username = 'admin';
    component.password = 'incorrecto';

    component.onLogin();

    expect(component.errorMessage)
      .toBe('Usuario o contraseña incorrectos');

  });


  // ==========================================================
  // TEST 4 — INVALID USERNAME
  // ==========================================================

  it('should not navigate with an invalid username', () => {

    component.username = 'noescorrecto';
    component.password = '1234';

    component.onLogin();

    expect(routerSpy.navigate)
      .not.toHaveBeenCalled();

    expect(component.errorMessage)
      .toBe('Usuario o contraseña incorrectos');

  });

});

