import { ReactElement } from 'react';

export interface RunningSpot {
  id: number;
  name: string;
  distance: string;
  difficulty: string;
  terrain: string;
  rating: number;
  description: string;
  features: string[];
  icon: ReactElement;
  image: string;
}
