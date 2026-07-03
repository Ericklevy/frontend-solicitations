export interface User {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'ANALYST' | 'ADMIN';
  coverageStates?: string[];
}

export interface CreateInternalUserRequest {
  name?: string;
  email?: string;
  password?: string;
  role?: 'ANALYST' | 'ADMIN';
  coverageStates?: string[];
}

export interface CoverageUpdateDTO {
  coverageStates: string[];
}
