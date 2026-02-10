export type DisciplinaryStatus = 'At Risk' | 'Good Standing' | 'Critical';

export type ESignStatus =
  | { type: 'pending'; count: number }
  | { type: 'compliant' };

export interface DisciplinaryRow {
  id?: string;
  name: string;
  role: string;
  points90Day: number;
  mostRecent: string; // MM-DD-YYYY
  status: DisciplinaryStatus;
  eSignStatus: ESignStatus;
}

// Details page types
export interface DisciplinaryDetailsEmployee {
  id: string;
  name: string;
  role: string;
  status: DisciplinaryStatus;
  points90Day: number;
  pointsThreshold: number;
  avatarUrl?: string;
}

export interface RequiredProtocol {
  nextAction: string;
  message?: string;
}

export interface IncidentHistoryItem {
  incidentType: string;
  date: string;
  documentName: string;
  status: 'pending' | 'signed';
}

export interface DocumentVaultItem {
  fileName: string;
}
