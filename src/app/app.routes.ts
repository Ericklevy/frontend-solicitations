import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { ClientDashboardComponent } from './features/client/client-dashboard/client-dashboard.component';
import { SolicitationWizardComponent } from './features/client/solicitation-wizard/solicitation-wizard.component';
import { AnalystDashboardComponent } from './features/analyst/analyst-dashboard/analyst-dashboard.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { AdminOverviewComponent } from './features/admin/admin-overview/admin-overview.component';
import { AdminReportsComponent } from './features/admin/admin-reports/admin-reports.component';
import { AdminServicesComponent } from './features/admin/admin-services/admin-services.component';
import { AdminSettingsComponent } from './features/admin/admin-settings/admin-settings.component';
import { AdminSupportComponent } from './features/admin/admin-support/admin-support.component';
import { AnalystOverviewComponent } from './features/analyst/analyst-overview/analyst-overview.component';
import { AnalystProvidersComponent } from './features/analyst/analyst-providers/analyst-providers.component';
import { AnalystAnalyticsComponent } from './features/analyst/analyst-analytics/analyst-analytics.component';
import { AnalystSettingsComponent } from './features/analyst/analyst-settings/analyst-settings.component';
import { ClientProfileComponent } from './features/client/client-profile/client-profile.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { 
    path: 'cliente/painel', 
    component: ClientDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['CLIENT'] }
  },
  { 
    path: 'cliente/nova-solicitacao', 
    component: SolicitationWizardComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['CLIENT'] }
  },
  { 
    path: 'cliente/perfil', 
    component: ClientProfileComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['CLIENT'] }
  },
  { 
    path: 'analista/dashboard', 
    component: AnalystOverviewComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ANALYST', 'ADMIN'] }
  },
  { 
    path: 'analista/painel', 
    component: AnalystDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ANALYST', 'ADMIN'] }
  },
  { 
    path: 'analista/fornecedores', 
    component: AnalystProvidersComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ANALYST', 'ADMIN'] }
  },
  { 
    path: 'analista/analytics', 
    component: AnalystAnalyticsComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ANALYST', 'ADMIN'] }
  },
  { 
    path: 'analista/configuracoes', 
    component: AnalystSettingsComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ANALYST', 'ADMIN'] }
  },
  { 
    path: 'admin/painel', 
    component: AdminOverviewComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  { 
    path: 'admin/equipe', 
    component: AdminDashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  { 
    path: 'admin/relatorios', 
    component: AdminReportsComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  { 
    path: 'admin/servicos', 
    component: AdminServicesComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  { 
    path: 'admin/configuracoes', 
    component: AdminSettingsComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  { 
    path: 'admin/suporte', 
    component: AdminSupportComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }
  },
  { path: '', redirectTo: '/auth', pathMatch: 'full' }
];
