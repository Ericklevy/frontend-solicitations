import { RouterModule } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-profile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './client-profile.component.html',
  styleUrl: './client-profile.component.scss'
})
export class ClientProfileComponent implements OnInit {
  currentUser: any = null;
  private authService = inject(AuthService);

  ngOnInit() {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.currentUser = {
          name: 'Cliente',
          email: payload.sub || payload.email || 'client@luxe.com'
        };
      } catch (e) {
        this.currentUser = { name: 'Cliente', email: 'client@luxe.com' };
      }
    }
  }
}
