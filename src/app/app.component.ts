import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend-solicitations';
  private http = inject(HttpClient);

  ngOnInit() {
    // "Ping" no backend para acordar o servidor do Render instantaneamente!
    // Enviamos uma requisição para a raiz da API em background logo que o Angular carrega.
    const baseUrl = environment.apiUrl.replace('/api', '');
    this.http.get(baseUrl, { responseType: 'text' }).subscribe({
      next: () => console.log('Backend Awake!'),
      error: () => console.log('Ping sent to wakeup backend')
    });
  }
}
