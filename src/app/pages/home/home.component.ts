// src/app/pages/home/home.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlane, faTicket, faGear, faChartLine, faUsers, faClipboardList,
  faArrowRight, faCircleCheck, faTriangleExclamation, faClockRotateLeft,
  faBell, faCalendarDays, faFileLines
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../core/services/auth.service';

export interface AppCard {
  icon: any;
  label: string;
  description: string;
  color: string;
  route: string;
  badge?: string;
  badgeType?: 'info' | 'warning' | 'success';
}

export interface ActivityItem {
  icon: any;
  text: string;
  time: string;
  type: 'success' | 'warning' | 'info';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatTooltipModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthService);
  currentUser = this.authService.currentUser;

  faArrowRight = faArrowRight;
  faBell = faBell;
  faCalendarDays = faCalendarDays;

  greeting = signal('');
  currentDate = signal('');

  apps: AppCard[] = [
    {
      icon: faTicket,
      label: 'Tickets',
      description: 'Gestión de incidencias y solicitudes',
      color: '#6c3fc5',
      route: '/app/profile',
      badge: '3 nuevos',
      badgeType: 'info'
    },
    {
      icon: faChartLine,
      label: 'Reportes',
      description: 'Estadísticas y métricas operativas',
      color: '#2e86de',
      route: '/app/profile',
    },
    {
      icon: faUsers,
      label: 'Colaboradores',
      description: 'Directorio del personal LAP',
      color: '#10ac84',
      route: '/app/profile',
    },
    {
      icon: faClipboardList,
      label: 'Solicitudes',
      description: 'Control de solicitudes internas',
      color: '#ee5a24',
      route: '/app/profile',
      badge: '1 pendiente',
      badgeType: 'warning'
    },
    {
      icon: faFileLines,
      label: 'Documentos',
      description: 'Repositorio de documentos corporativos',
      color: '#8e44ad',
      route: '/app/profile',
    },
    {
      icon: faGear,
      label: 'Configuración',
      description: 'Ajustes del sistema y preferencias',
      color: '#636e72',
      route: '/app/profile',
    }
  ];

  recentActivity: ActivityItem[] = [
    { icon: faCircleCheck,        text: 'Ticket #1042 resuelto correctamente',           time: 'hace 10 min',  type: 'success' },
    { icon: faTriangleExclamation,text: 'Solicitud #87 pendiente de aprobación',          time: 'hace 25 min',  type: 'warning' },
    { icon: faClockRotateLeft,    text: 'Reporte mensual generado — Enero 2026',          time: 'hace 1 hora',  type: 'info'    },
    { icon: faCircleCheck,        text: 'Nuevo colaborador registrado: Ana Flores',       time: 'hace 2 horas', type: 'success' },
    { icon: faClockRotateLeft,    text: 'Documento "POE-2026-03" actualizado',            time: 'hace 3 horas', type: 'info'    },
  ];

  stats = [
    { label: 'Tickets abiertos',    value: '12', trend: '+2',  up: false },
    { label: 'Resueltos hoy',       value: '8',  trend: '+3',  up: true  },
    { label: 'Solicitudes activas', value: '5',  trend: '-1',  up: true  },
    { label: 'Colaboradores',       value: '134',trend: '+1',  up: true  },
  ];

  ngOnInit(): void {
    const hour = new Date().getHours();
    if (hour < 12)      this.greeting.set('Buenos días');
    else if (hour < 18) this.greeting.set('Buenas tardes');
    else                this.greeting.set('Buenas noches');

    const now = new Date();
    this.currentDate.set(now.toLocaleDateString('es-PE', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }));
  }

  get firstName(): string {
    return this.currentUser()?.nombre?.split(' ')[0] || 'Usuario';
  }
}
