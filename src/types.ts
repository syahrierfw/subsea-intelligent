export type Risk = 'critical' | 'watch' | 'healthy';

export type Corridor = {
  id: string;
  group: 'Priority development' | 'Telin cable systems';
  label: string;
  route: string;
  owner: string;
  progress: number;
  demand: number;
  diversity: number;
  returnScore: number;
  risk: Risk;
  nextGate: string;
  rfs: string;
  tags: string[];
};

export type Signal = {
  id: number;
  title: string;
  detail: string;
  corridorId: string;
  risk: Risk;
  time: string;
};

export type ProjectDetail = {
  evidence: { label: string; state: 'current' | 'watch' | 'missing' }[];
  milestones: { name: string; owner: string; due: string; state: 'done' | 'watch' | 'risk' }[];
  updates: { date: string; text: string; source: string }[];
  forecast: string;
};
