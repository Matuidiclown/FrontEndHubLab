// src/app/core/services/alert.service.ts
import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  success(title: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: '#6c3fc5',
      timer: 2500,
      timerProgressBar: true
    });
  }

  error(title: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#6c3fc5'
    });
  }

  warning(title: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonColor: '#6c3fc5'
    });
  }

  confirm(title: string, text?: string): Promise<SweetAlertResult> {
    return Swal.fire({
      icon: 'question',
      title,
      text,
      showCancelButton: true,
      confirmButtonColor: '#6c3fc5',
      cancelButtonColor: '#aaa',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    });
  }

  loading(title = 'Cargando...'): void {
    Swal.fire({
      title,
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    });
  }

  close(): void {
    Swal.close();
  }
}
