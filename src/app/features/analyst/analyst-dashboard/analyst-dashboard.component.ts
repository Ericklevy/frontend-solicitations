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
  
  // Filters and Pagination
  searchQuery = '';
  selectedStatuses: string[] = ['SUBMITTED', 'IN_REVIEW'];
  selectedServiceType = '';
  selectedPriority = '';
  dateFrom = '';
  dateTo = '';
  
  currentPage = 0;
  pageSize = 10;
  totalElements = 0;
  
  showAdvancedFilters = false;

  private analystService = inject(AnalystService);
  private authService = inject(AuthService);

  ngOnInit() {
    this.loadSolicitations();
  }

  loadSolicitations() {
    this.isLoading = true;
    
    const filters = {
      q: this.searchQuery,
      status: this.selectedStatuses,
      serviceType: this.selectedServiceType,
      priority: this.selectedPriority,
      dateFrom: this.dateFrom,
      dateTo: this.dateTo,
      page: this.currentPage,
      size: this.pageSize
    };

    this.analystService.search(filters).subscribe({
      next: (data) => {
        this.solicitations = data.items;
        this.totalElements = data.total;
        this.currentPage = data.page;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.solicitations = [];
      }
    });
  }

  onSearchChange() {
    this.currentPage = 0;
    this.loadSolicitations();
  }

  onFilterChange() {
    this.currentPage = 0;
    this.loadSolicitations();
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalElements) {
      this.currentPage++;
      this.loadSolicitations();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadSolicitations();
    }
  }
  
  get totalPages() {
    return Math.ceil(this.totalElements / this.pageSize);
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
