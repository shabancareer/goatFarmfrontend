export interface Animal {
  id: string | number;
  tagId: string;
  name?: string;
  breed?: string;
  gender: 'MALE' | 'FEMALE';
  dob?: string;
  weight?: number;
  status?: string;
  sireId?: string;
  damId?: string;
}

export interface WeightRecord {
  id: string;
  animalId: string;
  weight: number;
  date: string;
}

export interface TimelineEvent {
  id: string;
  animalId: string;
  title: string;
  description?: string;
  type: 'HEALTH' | 'BREEDING' | 'WEIGHT' | 'MOVEMENT';
  date: string;
}
