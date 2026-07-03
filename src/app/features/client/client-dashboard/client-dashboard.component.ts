import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitationService } from '../../../core/services/solicitation.service';
import { Solicitation } from '../../../core/models/solicitation.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.scss'
})
export class ClientDashboardComponent implements OnInit {
  solicitations: Solicitation[] = [];
  filteredSolicitations: Solicitation[] = [];
  isLoading = false;
  currentFilter: 'ALL' | 'IN_REVIEW' | 'APPROVED' = 'ALL';
  searchQuery = '';
  selectedSolicitation: Solicitation | null = null;

  private solicitationService = inject(SolicitationService);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.loadSolicitations();
  }

  loadSolicitations() {
    this.isLoading = true;
    this.solicitationService.getMySolicitations().subscribe({
      next: (data) => {
        this.solicitations = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  setFilter(filter: 'ALL' | 'IN_REVIEW' | 'APPROVED') {
    this.currentFilter = filter;
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.solicitations];
    
    if (this.currentFilter === 'IN_REVIEW') {
      filtered = filtered.filter(s => s && (s.status === 'SUBMITTED' || s.status === 'IN_REVIEW'));
    } else if (this.currentFilter === 'APPROVED') {
      filtered = filtered.filter(s => s && s.status === 'APPROVED');
    }

    if (this.searchQuery && this.searchQuery.trim() !== '') {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(s => s &&
        ((s.title && s.title.toLowerCase().includes(q)) ||
        (s.serviceType && s.serviceType.toLowerCase().includes(q)) ||
        (s.id && String(s.id).toLowerCase().includes(q)))
      );
    }

    this.filteredSolicitations = filtered;
  }

  openDetails(solicitation: Solicitation) {
    this.selectedSolicitation = solicitation;
  }

  closeDetails() {
    this.selectedSolicitation = null;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
