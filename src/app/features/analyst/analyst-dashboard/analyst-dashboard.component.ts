import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalystService } from '../../../core/services/analyst.service';
import { Solicitation } from '../../../core/models/solicitation.model';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-analyst-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './analyst-dashboard.component.html',
  styleUrls: ['./analyst-dashboard.component.scss']
})
export class AnalystDashboardComponent implements OnInit {
  solicitations: Solicitation[] = [];
  selectedSolicitation: Solicitation | null = null;
  isMobileMenuOpen = false;
  isLoading = false;
  isProcessing = false;
  comment = '';
  searchQuery = '';

  private analystService = inject(AnalystService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.loadSolicitations();
  }

  loadSolicitations() {
    this.isLoading = true;
    this.analystService.search(this.searchQuery).subscribe({
      next: (data) => {
        this.solicitations = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSearchChange() {
    this.loadSolicitations();
  }

  selectRow(solicitation: Solicitation) {
    this.selectedSolicitation = solicitation;
    this.comment = '';
    // Optional: call startAnalysis here if required by the backend flow
    // this.analystService.startAnalysis(solicitation.id).subscribe();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.authService.logout();
    window.location.href = '/auth';
  }

  decide(decision: 'APPROVED' | 'REJECTED') {
    if (!this.selectedSolicitation) return;
    
    this.isProcessing = true;
    this.analystService.decide(this.selectedSolicitation.id, {
      decision,
      comment: this.comment
    }).subscribe({
      next: () => {
        this.isProcessing = false;
        this.selectedSolicitation = null;
        Swal.fire('Sucesso!', `Solicitação ${decision === 'APPROVED' ? 'aprovada' : 'rejeitada'} com sucesso!`, 'success');
        this.loadSolicitations();
      },
      error: () => {
        this.isProcessing = false;
        Swal.fire('Erro!', 'Erro ao registrar decisão.', 'error');
      }
    });
  }
}
