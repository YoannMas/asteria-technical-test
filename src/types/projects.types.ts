export interface Project {
  id: number;
  name: string;
  technicalChallenges: TechnicalChallenge[];
}

export interface TechnicalChallenge {
  id: number;
  name: string;
  biologicalModels: BiologicalModel[];
}

export interface BiologicalModel {
  id: number;
  name: string;
}
