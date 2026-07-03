import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  currentFlow: 'login' | 'signup' = 'signup';
  
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  signupForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = false;
  errorMessage = '';

  switchTab(tab: 'login' | 'signup') {
    this.currentFlow = tab;
    this.errorMessage = '';
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.redirectBasedOnRole(res.role);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Erro ao realizar login. Verifique suas credenciais.';
        Swal.fire('Acesso Negado', this.errorMessage, 'error');
      }
    });
  }

  onSignup() {
    if (this.signupForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.signupForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.redirectBasedOnRole(res.role);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Erro ao criar conta. Tente novamente.';
        Swal.fire('Erro no Cadastro', this.errorMessage, 'error');
      }
    });
  }

  private redirectBasedOnRole(role: string) {
    if (role === 'ADMIN') this.router.navigate(['/admin/equipe']);
    else if (role === 'ANALYST') this.router.navigate(['/analista/painel']);
    else this.router.navigate(['/cliente/painel']);
  }
}
