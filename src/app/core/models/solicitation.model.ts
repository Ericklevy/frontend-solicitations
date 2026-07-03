export interface Solicitation {
  id: string;
  clientId: string;
  status: 'DRAFT' | 'SUBMITTED' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED';
  serviceType?: string;
  title?: string;
  description?: string;
  cep?: string;
  number?: string;
  complement?: string;
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  preferredDate?: string;
  estimatedValue?: number;
  termsAccepted?: boolean;
}

export interface Step1Request {
  serviceType: string;
  title: string;
  description: string;
}

export interface Step2Request {
  cep: string;
  number: string;
  complement?: string;
}

export interface Step3Request {
  priority: string;
  preferredDate: string;
  estimatedValue: number;
  termsAccepted: boolean;
}

export interface DecideRequest {
  decision: 'APPROVED' | 'REJECTED';
  comment: string;
}
