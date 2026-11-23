import type { Corridor, ProjectDetail, Signal } from './types';

export const corridors: Corridor[] = [
  { id: 'ice10', group: 'Priority development', label: 'ICE 10', route: 'Singapore → US West', owner: 'Subsea SPO', progress: 54, demand: 96, diversity: 84, returnScore: 93, risk: 'critical', nextGate: 'Rights escalation', rfs: 'H2 2032', tags: ['AI inference', 'Hyperscaler'] },
  { id: 'ice2', group: 'Priority development', label: 'ICE 2', route: 'Singapore → Indonesia / US', owner: 'Subsea SPO', progress: 61, demand: 98, diversity: 81, returnScore: 91, risk: 'watch', nextGate: 'Supply contract', rfs: 'H2 2033', tags: ['Anchor demand', 'NeoCloud'] },
  { id: 'ice4', group: 'Priority development', label: 'ICE 4', route: 'Asia → Middle East', owner: 'Partnership', progress: 70, demand: 89, diversity: 93, returnScore: 86, risk: 'watch', nextGate: 'Landing readiness', rfs: 'H2 2031', tags: ['Sovereign AI', 'Diversity'] },
  { id: 'ice1', group: 'Priority development', label: 'ICE 1 Leg 1', route: 'Batam → Singapore', owner: 'Project', progress: 82, demand: 94, diversity: 90, returnScore: 88, risk: 'healthy', nextGate: 'C&M signing', rfs: 'Q1 2028', tags: ['Hub route', 'Anchor demand'] },
  { id: 'bifrost', group: 'Telin cable systems', label: 'BIFROST', route: 'Singapore / Indonesia → US West', owner: 'Commercial', progress: 78, demand: 98, diversity: 81, returnScore: 91, risk: 'watch', nextGate: 'Commercial scale', rfs: 'Live', tags: ['Trans-Pacific', 'Hyperscaler'] },
  { id: 'topaz', group: 'Telin cable systems', label: 'TOPAZ', route: 'Japan → Canada / US', owner: 'Network Strategy', progress: 75, demand: 91, diversity: 85, returnScore: 83, risk: 'healthy', nextGate: 'Capacity plan', rfs: 'Live', tags: ['Japan-US', 'AI cloud'] },
  { id: 'sjc2', group: 'Telin cable systems', label: 'SJC2', route: 'Singapore → Hong Kong / Japan', owner: 'Regional GTM', progress: 76, demand: 88, diversity: 87, returnScore: 82, risk: 'healthy', nextGate: 'GTM review', rfs: 'Live', tags: ['Intra-Asia', 'Cloud'] },
  { id: 'peace', group: 'Telin cable systems', label: 'PEACE', route: 'Singapore → France', owner: 'Regional GTM', progress: 72, demand: 78, diversity: 95, returnScore: 75, risk: 'healthy', nextGate: 'Commercial scale', rfs: 'Live', tags: ['Asia-Europe', 'Diversity'] },
  { id: 'igg', group: 'Telin cable systems', label: 'IGG + SEA-US', route: 'SEA / Indonesia / Guam → US', owner: 'Network Strategy', progress: 74, demand: 91, diversity: 87, returnScore: 84, risk: 'healthy', nextGate: 'Capacity plan', rfs: 'Live', tags: ['Trans-Pacific', '5.9 Tb'] },
  { id: 'ncc', group: 'Telin cable systems', label: 'NCC', route: 'Batam → Singapore', owner: 'Project', progress: 82, demand: 94, diversity: 90, returnScore: 88, risk: 'healthy', nextGate: 'C&M signing', rfs: 'Live', tags: ['ICE', 'Data centre hub'] }
];

export const signals: Signal[] = [
  { id: 1, title: 'Supplier slot has moved by 6 weeks', detail: 'Schedule / CAPEX exposure: USD 2.1M', corridorId: 'ice10', risk: 'critical', time: '12m ago' },
  { id: 2, title: 'Singapore landing permit needs support', detail: 'Dependency to ICE 2 and ICE 10 critical path', corridorId: 'ice2', risk: 'critical', time: '1h ago' },
  { id: 3, title: 'NeoCloud demand indicates 18 Tbps potential', detail: 'Asia–Middle East opportunity to qualify', corridorId: 'ice4', risk: 'watch', time: '3h ago' },
  { id: 4, title: 'Anchor tenant pipeline below target', detail: 'Commercial readiness remains below decision threshold', corridorId: 'ice2', risk: 'watch', time: 'Today' }
];

export const projectDetails: Record<string, ProjectDetail> = {
  ice10: {
    evidence: [{ label: 'CIF / RFS plan', state: 'current' }, { label: 'Supplier schedule', state: 'watch' }, { label: 'Permit tracker', state: 'current' }, { label: 'Anchor demand', state: 'missing' }, { label: 'CAPEX baseline', state: 'current' }],
    milestones: [{ name: 'Consortium rights matrix', owner: 'Legal', due: '28 Nov', state: 'risk' }, { name: 'Supply contract negotiation', owner: 'Procurement', due: '05 Dec', state: 'watch' }, { name: 'Singapore landing readiness', owner: 'Delivery', due: '12 Dec', state: 'watch' }, { name: 'Anchor tenant qualification', owner: 'Sales', due: '19 Dec', state: 'risk' }],
    updates: [{ date: 'Today', text: 'Supplier advised a six-week movement in the preferred manufacturing slot.', source: 'Supplier update' }, { date: '21 Nov', text: 'Commercial team requested recovery options against two anchor prospects.', source: 'Sales review' }, { date: '19 Nov', text: 'Rights-matrix decision requires executive resolution.', source: 'Legal tracker' }],
    forecast: 'Without a supplier fallback decision this week, the current critical path indicates a six-week RFS movement and a potential CAPEX exposure.'
  },
  ice2: {
    evidence: [{ label: 'CIF / RFS plan', state: 'current' }, { label: 'Supplier schedule', state: 'current' }, { label: 'Permit tracker', state: 'watch' }, { label: 'Anchor demand', state: 'watch' }, { label: 'CAPEX baseline', state: 'current' }],
    milestones: [{ name: 'C&M agreement', owner: 'Partnership', due: '04 Dec', state: 'watch' }, { name: 'Supply contract', owner: 'Procurement', due: '18 Dec', state: 'watch' }, { name: 'Commercial demand validation', owner: 'Sales', due: '20 Dec', state: 'risk' }, { name: 'RFS baseline refresh', owner: 'SPO', due: '12 Jan', state: 'done' }],
    updates: [{ date: 'Today', text: 'Singapore landing-permit dependency was raised for executive support.', source: 'Permit tracker' }, { date: '22 Nov', text: 'Anchor tenant pipeline remains below the decision threshold.', source: 'Sales pipeline' }, { date: '18 Nov', text: 'Supplier draft timeline received for cross-functional review.', source: 'Procurement' }],
    forecast: 'Commercial readiness is likely to lag project delivery unless anchor-demand validation and permit ownership are closed before the supply-contract gate.'
  },
  bifrost: {
    evidence: [{ label: 'CIF / RFS plan', state: 'current' }, { label: 'Supplier schedule', state: 'current' }, { label: 'Permit tracker', state: 'current' }, { label: 'Anchor demand', state: 'watch' }, { label: 'CAPEX baseline', state: 'current' }],
    milestones: [{ name: 'Capacity plan refresh', owner: 'Network', due: '29 Nov', state: 'watch' }, { name: 'Hyperscaler pipeline review', owner: 'Sales', due: '06 Dec', state: 'watch' }, { name: 'Product readiness pack', owner: 'Product', due: '13 Dec', state: 'done' }],
    updates: [{ date: 'Today', text: 'AI-inference demand cluster is under commercial qualification.', source: 'GTM signal' }, { date: '20 Nov', text: 'Route-diversity value proposition refreshed for priority prospects.', source: 'Product update' }],
    forecast: 'Demand appears sufficient for scale; the primary watchpoint is converting qualified hyperscaler demand into committed capacity.'
  }
};
