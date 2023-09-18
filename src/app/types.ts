export type AnalysisSection = {
  label: string;
  total: any;
  breakdown: {
    beneficiary: string;
    total: number;
    description?: string;
    percentage: number;
  }[];
};

export enum Beneficiary {
  nhqtrs = "nhqtrs", // national headquarter
  ahqtrs = "ahqtrs", // area headquarter
  phqtrs = "phqtrs", // provincial headquarter
  zhqtrs = "zhqtrs", // zonal headquarter
}

export type Field = {
  label: string;
  id: string;
  value?: number;
  breakdown: {
    beneficiary: Beneficiary;
    value: number;
    description?: string;
  }[];
};

export type Analysis = {
  analysis: any[];
  totals: {
    churchPlanting: number;
    totalRemitted: number;
    totalShares: any;
  };
};
