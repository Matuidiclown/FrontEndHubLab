// src/app/auth/login/login.component.ts
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faPlane } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FontAwesomeModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private alert = inject(AlertService);

  // Icons
  faEnvelope = faEnvelope;
  faLock = faLock;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faPlane = faPlane;

  loading = false;
  showPassword = false;

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.alert.success('¡Bienvenido!', 'Inicio de sesión exitoso').then(() => {
          this.router.navigate(['/app/home']);
        });
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message || 'Credenciales incorrectas. Intente nuevamente.';
        this.alert.error('Error de acceso', msg);
      }
    });
  }

  get emailError(): string {
    const ctrl = this.form.get('email');
    if (ctrl?.hasError('required')) return 'El email es requerido';
    if (ctrl?.hasError('email')) return 'Ingrese un email válido';
    return '';
  }

  get passwordError(): string {
    const ctrl = this.form.get('password');
    if (ctrl?.hasError('required')) return 'La contraseña es requerida';
    if (ctrl?.hasError('minlength')) return 'Mínimo 6 caracteres';
    return '';
  }
}
