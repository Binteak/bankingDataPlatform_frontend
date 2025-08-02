import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ButtonModule, PasswordModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router) {}

  onLogin() {
    console.log('Botón Login clickeado');
    console.log(`Username: ${this.username}, Password: ${this.password}`);
    if (this.username == 'admin' && this.password == '1234') {
      console.log('Credenciales correctas');
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Credenciales incorrectas');
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}

