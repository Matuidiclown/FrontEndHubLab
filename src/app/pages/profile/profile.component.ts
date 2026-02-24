// src/app/pages/profile/profile.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser, faCamera, faSave, faCircleUser
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { AlertService } from '../../core/services/alert.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    FontAwesomeModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private alert = inject(AlertService);

  faUser = faUser;
  faCamera = faCamera;
  faSave = faSave;
  faCircleUser = faCircleUser;

  currentUser = this.authService.currentUser;
  loading = signal(false);
  saving = signal(false);
  avatarPreview = signal<string | null>(null);

  form!: FormGroup;

  ngOnInit(): void {
    const user = this.currentUser();
    this.form = this.fb.group({
      nombre: [user?.nombre || '', Validators.required],
      apellido: [user?.apellido || '', Validators.required],
      email: [{ value: user?.email || '', disabled: true }],
      telefono: [user?.telefono || ''],
      fechaNacimiento: [user?.fechaNacimiento || null],
      biografia: [user?.biografia || '']
    });
  }

  onAvatarChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => this.avatarPreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const userId = this.currentUser()?.id || 0;

    this.userService.updateProfile(userId, this.form.getRawValue()).subscribe({
      next: () => {
        this.saving.set(false);
        this.alert.success('Perfil actualizado', 'Los cambios se guardaron correctamente.');
      },
      error: (err) => {
        this.saving.set(false);
        this.alert.error('Error', err?.error?.message || 'No se pudo guardar el perfil.');
      }
    });
  }

  get userInitials(): string {
    const user = this.currentUser();
    if (!user) return 'U';
    return `${user.nombre[0]}${user.apellido[0]}`.toUpperCase();
  }
}
