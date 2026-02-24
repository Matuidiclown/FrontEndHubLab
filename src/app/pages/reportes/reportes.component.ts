// src/app/pages/reportes/reportes.component.ts
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChartLine, faChartBar, faChartPie, faFileArrowDown,
  faCircleCheck, faTriangleExclamation, faHourglass,
  faArrowTrendUp, faArrowTrendDown, faFilter, faPrint,
  faCalendarDays, faTicket, faUsers, faFileLines
} from '@fortawesome/free-solid-svg-icons';

export interface KpiCard {
  label: string;
  value: string;
  sub: string;
  icon: any;
  trend: number;
  color: string;
}

export interface ReporteRow {
  id: string;
  tipo: string;
  area: string;
  responsable: string;
  fecha: string;
  estado: 'Completado' | 'En proceso' | 'Pendiente';
  progreso: number;
}

export interface BarData {
  label: string;
  value: number;
  max: number;
  color: string;
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatButtonModule, MatSelectModule, MatFormFieldModule,
    MatInputModule, MatTooltipModule, MatTabsModule,
    FontAwesomeModule
  ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {
  // Icons
  faChartLine      = faChartLine;
  faChartBar       = faChartBar;
  faChartPie       = faChartPie;
  faFileArrowDown  = faFileArrowDown;
  faCircleCheck    = faCircleCheck;
  faTriangleExclamation = faTriangleExclamation;
  faHourglass      = faHourglass;
  faArrowTrendUp   = faArrowTrendUp;
  faArrowTrendDown = faArrowTrendDown;
  faFilter         = faFilter;
  faPrint          = faPrint;
  faCalendarDays   = faCalendarDays;
  faTicket         = faTicket;
  faUsers          = faUsers;
  faFileLines      = faFileLines;

  // Filtros
  periodoSeleccionado = signal('enero-2026');
  areaSeleccionada    = signal('todas');

  periodos = [
    { value: 'enero-2026',    label: 'Enero 2026' },
    { value: 'febrero-2026',  label: 'Febrero 2026' },
    { value: 'q1-2026',       label: 'Q1 2026' },
    { value: 'diciembre-2025',label: 'Diciembre 2025' },
  ];

  areas = [
    { value: 'todas',       label: 'Todas las áreas' },
    { value: 'ti',          label: 'Tecnología (TI)' },
    { value: 'operaciones', label: 'Operaciones' },
    { value: 'rrhh',        label: 'Recursos Humanos' },
    { value: 'seguridad',   label: 'Seguridad' },
  ];

  // KPIs
  kpis: KpiCard[] = [
    { label: 'Tickets Resueltos',    value: '148', sub: 'este mes',      icon: faTicket,    trend: +12, color: '#6c3fc5' },
    { label: 'Tiempo Promedio',      value: '4.2h', sub: 'por ticket',   icon: faHourglass, trend: -8,  color: '#2e86de' },
    { label: 'Colaboradores Activos',value: '134',  sub: 'registrados',  icon: faUsers,     trend: +3,  color: '#10ac84' },
    { label: 'Documentos Emitidos',  value: '62',   sub: 'este mes',     icon: faFileLines, trend: +5,  color: '#ee5a24' },
  ];

  // Tabla
  reportes: ReporteRow[] = [
    { id: 'RPT-001', tipo: 'Incidencia TI',      area: 'Tecnología',   responsable: 'R. Samamé',  fecha: '15/01/2026', estado: 'Completado', progreso: 100 },
    { id: 'RPT-002', tipo: 'Solicitud RRHH',      area: 'RRHH',         responsable: 'A. Flores',  fecha: '16/01/2026', estado: 'Completado', progreso: 100 },
    { id: 'RPT-003', tipo: 'Mantenimiento',       area: 'Operaciones',  responsable: 'C. López',   fecha: '17/01/2026', estado: 'En proceso', progreso: 65  },
    { id: 'RPT-004', tipo: 'Auditoría Seguridad', area: 'Seguridad',    responsable: 'M. Torres',  fecha: '18/01/2026', estado: 'En proceso', progreso: 40  },
    { id: 'RPT-005', tipo: 'Incidencia TI',      area: 'Tecnología',   responsable: 'R. Samamé',  fecha: '19/01/2026', estado: 'Pendiente',  progreso: 0   },
    { id: 'RPT-006', tipo: 'Reporte Mensual',     area: 'RRHH',         responsable: 'A. Flores',  fecha: '20/01/2026', estado: 'Pendiente',  progreso: 0   },
  ];

  filtroTexto = '';

  reportesFiltrados = computed(() => {
    const txt = this.filtroTexto.toLowerCase();
    if (!txt) return this.reportes;
    return this.reportes.filter(r =>
      r.id.toLowerCase().includes(txt) ||
      r.tipo.toLowerCase().includes(txt) ||
      r.area.toLowerCase().includes(txt) ||
      r.responsable.toLowerCase().includes(txt)
    );
  });

  // Barras por área
  barras: BarData[] = [
    { label: 'Tecnología',   value: 52, max: 100, color: '#6c3fc5' },
    { label: 'Operaciones',  value: 38, max: 100, color: '#2e86de' },
    { label: 'RRHH',         value: 30, max: 100, color: '#10ac84' },
    { label: 'Seguridad',    value: 18, max: 100, color: '#ee5a24' },
    { label: 'Finanzas',     value: 10, max: 100, color: '#f9ca24' },
  ];

  // Dona (porcentajes)
  donaData = [
    { label: 'Completados', value: 62, color: '#10ac84' },
    { label: 'En proceso',  value: 24, color: '#2e86de' },
    { label: 'Pendientes',  value: 14, color: '#ee5a24' },
  ];

  // Sparkline simple (últimos 7 días)
  sparkValues = [8, 14, 11, 18, 13, 20, 16];
  get sparkMax() { return Math.max(...this.sparkValues); }
  sparkY(v: number) { return 100 - (v / this.sparkMax) * 85; }
  get sparkAverage(): string {
    const sum = this.sparkValues.reduce((a, b) => a + b, 0);
    return (sum / this.sparkValues.length).toFixed(1);
  }

  sparkPoints() {
    const w = 100 / (this.sparkValues.length - 1);
    return this.sparkValues.map((v, i) => `${i * w},${this.sparkY(v)}`).join(' ');
  }

  // Dona SVG helpers
  donaTotal = computed(() => this.donaData.reduce((a, b) => a + b.value, 0));
  donaSegments = computed(() => {
    const r = 30, cx = 50, cy = 50;
    const circ = 2 * Math.PI * r;
    let offset = 0;
    return this.donaData.map(d => {
      const pct   = d.value / this.donaTotal();
      const dash  = pct * circ;
      const gap   = circ - dash;
      const rot   = offset * 360;
      offset += pct;
      return { ...d, dasharray: `${dash} ${gap}`, rotation: rot };
    });
  });

  exportar() {
    alert('Exportando reporte a PDF/Excel... (conectar con backend)');
  }

  imprimir() {
    window.print();
  }
}
