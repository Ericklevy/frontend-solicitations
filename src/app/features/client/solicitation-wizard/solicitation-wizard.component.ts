import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitationService } from '../../../core/services/solicitation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitation-wizard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitation-wizard.component.html',
  styleUrls: ['./solicitation-wizard.component.scss']
})
export class SolicitationWizardComponent implements OnInit {
  currentStep = 1;
  totalSteps = 3;
  isProcessing = false;
  draftId: string | null = null;
  errorMessage = '';

  private fb = inject(FormBuilder);
  private solicitationService = inject(SolicitationService);
  private router = inject(Router);

  step1Form: FormGroup = this.fb.group({
    serviceType: ['', Validators.required],
    title: ['', Validators.required],
    description: ['', Validators.required]
  });

  step2Form: FormGroup = this.fb.group({
    cep: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
    number: ['', Validators.required],
    complement: ['']
  });

  step3Form: FormGroup = this.fb.group({
    priority: ['HIGH', Validators.required],
    preferredDate: ['', Validators.required],
    estimatedValue: [0, Validators.min(0)],
    termsAccepted: [false, Validators.requiredTrue]
  });

  ngOnInit(): void {
    // Inicializa o rascunho assim que a tela abre
    this.isProcessing = true;
    this.solicitationService.createDraft().subscribe({
      next: (res) => {
        this.draftId = res.id;
        this.isProcessing = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao iniciar solicitação. Tente novamente.';
        this.isProcessing = false;
      }
    });
  }

  nextStep() {
    if (!this.draftId) return;

    this.isProcessing = true;
    this.errorMessage = '';

    if (this.currentStep === 1) {
      if (this.step1Form.invalid) {
        this.step1Form.markAllAsTouched();
        this.isProcessing = false;
        return;
      }
      this.solicitationService.saveStep1(this.draftId, this.step1Form.value).subscribe({
        next: () => {
          this.currentStep++;
          this.isProcessing = false;
        },
        error: () => this.handleError('Erro ao salvar Detalhes do Serviço.')
      });
    } else if (this.currentStep === 2) {
      if (this.step2Form.invalid) {
        this.step2Form.markAllAsTouched();
        this.isProcessing = false;
        return;
      }
      this.solicitationService.saveStep2(this.draftId, this.step2Form.value).subscribe({
        next: () => {
          this.currentStep++;
          this.isProcessing = false;
        },
        error: () => this.handleError('Erro ao salvar Localização.')
      });
    } else if (this.currentStep === 3) {
      if (this.step3Form.invalid) {
        this.step3Form.markAllAsTouched();
        this.isProcessing = false;
        return;
      }
      this.solicitationService.saveStep3(this.draftId, this.step3Form.value).subscribe({
        next: () => {
          this.solicitationService.submit(this.draftId!).subscribe({
            next: () => {
              this.isProcessing = false;
              Swal.fire('Sucesso!', 'Solicitação finalizada e enviada para análise!', 'success').then(() => {
                this.router.navigate(['/cliente/painel']);
              });
            },
            error: () => this.handleError('Erro ao enviar solicitação.')
          });
        },
        error: () => this.handleError('Erro ao salvar Agendamento.')
      });
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  get progressPercentage() {
    return ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
  }

  private handleError(msg: string) {
    this.errorMessage = msg;
    this.isProcessing = false;
    Swal.fire('Ops!', msg, 'error');
  }
}
