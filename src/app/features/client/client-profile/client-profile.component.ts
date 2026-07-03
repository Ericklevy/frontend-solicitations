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
    this.currentUser = {
      name: localStorage.getItem('name') || 'Luxe Client',
      email: localStorage.getItem('email') || 'client@luxe.com'
    };
  }
}
