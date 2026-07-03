import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  selectedUfs: string[] = [];
  analysts: User[] = [];
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private authService = inject(AuthService);

  analystForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  ngOnInit(): void {
    this.loadAnalysts();
  }

  loadAnalysts() {
    this.isLoading = true;
    this.adminService.getAllAnalysts().subscribe({
      next: (data) => {
        this.analysts = data.filter((u: User) => u.role === 'ANALYST');
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  toggleUf(uf: string) {
    if (this.selectedUfs.includes(uf)) {
      this.selectedUfs = this.selectedUfs.filter(u => u !== uf);
    } else {
      this.selectedUfs.push(uf);
    }
  }

  submitForm() {
    if (this.analystForm.invalid) {
      this.analystForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = {
      ...this.analystForm.value,
      role: 'ANALYST',
      coverageStates: this.selectedUfs
    };

    this.adminService.createAnalyst(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire('Sucesso!', 'Analista cadastrado com sucesso!', 'success');
        this.analystForm.reset();
        this.selectedUfs = [];
        this.loadAnalysts(); // recarrega a lista
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err.error?.message || 'Erro ao cadastrar analista.';
        Swal.fire('Erro!', this.errorMessage, 'error');
      }
    });
  }
  
  logout() {
    this.authService.logout();
    window.location.href = '/auth';
  }
}
