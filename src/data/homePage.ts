import type { IconName } from '../components/ui/Icon';

interface IconCardContent {
  icon: IconName;
  title: string;
  body: string;
}

export const challenges: IconCardContent[] = [
  {
    icon: 'stack',
    title: 'Fragmented asset data',
    body: 'Asset records, operating data, financial accounts, and ownership information often exist across separate platforms.',
  },
  {
    icon: 'file',
    title: 'Manual financial operations',
    body: 'Revenue reconciliation, expense allocation, reserve management, and investor distributions can require substantial manual work.',
  },
  {
    icon: 'nodes',
    title: 'Disconnected payment infrastructure',
    body: 'Moving funds between asset operators, financial institutions, investors, and digital payment systems can introduce friction.',
  },
];

export const approachPillars: IconCardContent[] = [
  {
    icon: 'building',
    title: 'RWA financial infrastructure',
    body: 'Bring asset records, ownership structures, income, expenses, and reporting into one connected operating layer.',
  },
  {
    icon: 'brain',
    title: 'Intelligent asset operations',
    body: 'Use AI to support revenue reconciliation, financial forecasting, expense analysis, and operational workflows.',
  },
  {
    icon: 'wallet',
    title: 'Programmable payments',
    body: 'Enable policy-driven payments, expense controls, and cash-flow allocation through compatible payment infrastructure.',
  },
  {
    icon: 'file',
    title: 'Transparent financial workflows',
    body: 'Link financial activity to asset-level operations with clear, auditable records.',
  },
  {
    icon: 'network',
    title: 'Stablecoin integration',
    body: 'Connect tokenized asset workflows to digital-dollar settlement and supported payment rails.',
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Connect',
    body: 'Bring together asset records, revenue, expenses, and financial data from compatible systems.',
  },
  {
    number: '02',
    title: 'Understand',
    body: 'Reconcile transactions, analyze cash flow, identify inconsistencies, and create a clearer picture.',
  },
  {
    number: '03',
    title: 'Govern',
    body: 'Apply financial policies, permissions, spending limits, approvals, and compliance requirements.',
  },
  {
    number: '04',
    title: 'Execute',
    body: 'Coordinate authorized payments and financial workflows with supported infrastructure and reporting.',
  },
];

export const sectors = [
  {
    title: 'Commercial Real Estate',
    body: 'Connect property-level income, expenses, reserves, and reporting through integrated workflows.',
    image: 'photo-1582407947304-fd86f028f716',
  },
  {
    title: 'Renewable Energy',
    body: 'Link production data, operating expenses, maintenance, and project revenue.',
    image: 'photo-1548337138-e87d889cc369',
  },
  {
    title: 'Equipment & Receivables',
    body: 'Support equipment-leasing portfolios, invoices, and other assets with identifiable value.',
    image: 'photo-1494412574643-ff11b0a5c1c3',
  },
];

export const trustPrinciples: Array<{ icon: IconName; lines: [string, string] }> = [
  { icon: 'access', lines: ['Permission-based', 'access'] },
  { icon: 'receipt', lines: ['Auditable', 'transactions'] },
  { icon: 'limit', lines: ['Spending', 'limits'] },
  { icon: 'user', lines: ['Human', 'oversight'] },
  { icon: 'shield', lines: ['Security-first', 'development'] },
];

export const operationalCapabilities = [
  'Income reconciliation',
  'Cash-flow forecasting',
  'Expense analysis',
  'Anomaly detection',
  'Authorized payment workflows',
];
