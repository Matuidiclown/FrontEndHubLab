// src/app/core/services/user.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { User, ApiResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = inject(ApiService);

  getProfile(): Observable<ApiResponse<User>> {
    return this.api.get<ApiResponse<User>>('users/profile');
  }

  updateProfile(userId: number, data: Partial<User>): Observable<ApiResponse<User>> {
    return this.api.put<ApiResponse<User>>(`users/${userId}`, data);
  }

  uploadAvatar(userId: number, file: File): Observable<ApiResponse<{ avatarUrl: string }>> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.api.post<ApiResponse<{ avatarUrl: string }>>(`users/${userId}/avatar`, formData);
  }
}
