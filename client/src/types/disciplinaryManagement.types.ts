export type DisciplinaryStatus = 'At Risk' | 'Good Standing' | 'Critical';

export type ESignStatus =
  | { type: 'pending'; count: number }
  | { type: 'compliant' };

export interface DisciplinaryRow {
  name: string;
  role: string;
  points90Day: number;
  mostRecent: string; // MM-DD-YYYY
  status: DisciplinaryStatus;
  eSignStatus: ESignStatus;
}
