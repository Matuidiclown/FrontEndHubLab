// src/app/shared/layout/layout.component.ts
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUser, faRightFromBracket, faChevronLeft, faChevronRight,
  faMagnifyingGlass, faPlane, faBell, faHouse, faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    FormsModule, MatTooltipModule, FontAwesomeModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private authService = inject(AuthService);
  private alert = inject(AlertService);

  faUser             = faUser;
  faRightFromBracket = faRightFromBracket;
  faChevronLeft      = faChevronLeft;
  faChevronRight     = faChevronRight;
  faMagnifyingGlass  = faMagnifyingGlass;
  faPlane            = faPlane;
  faBell             = faBell;
  faHouse            = faHouse;
  faChartLine        = faChartLine;

  sidebarCollapsed = signal(false);
  searchQuery = '';
  currentUser = this.authService.currentUser;

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  logout(): void {
    this.alert.confirm('¿Cerrar sesión?', '¿Desea salir de la plataforma?').then(result => {
      if (result.isConfirmed) this.authService.logout();
    });
  }

  get userInitials(): string {
    const user = this.currentUser();
    if (!user) return 'U';
    return `${user.nombre[0]}${user.apellido[0]}`.toUpperCase();
  }
}
