export type AnalysisSection = {
  label: string;
  total: any;
  breakdown: {
    label: string;
    total: number;
    alias?: string;
    percentage: number;
  }[];
};

export type ShareValue =
  | {
      label: string;
      value: number;
    }
  | number;

export type Field = {
  label: string;
  id: string;
  value?: number;
  breakdown?: {
    nhqtrs?: ShareValue;
    ahqtrs?: ShareValue;
    phqtrs?: ShareValue;
    zhqtrs?: ShareValue;
  };
};

type who= 'nhqtrs' | 'ahqtrs' | 'phqtrs' | 
  'zhqtrs'

export type FieldV2 = {
  label: string;
  id: string;
  value?: number;
  breakdown: { who: who; value: number; description?: string }[];
};

export type Analysis = {
  analysis: any[];
  totals: {
    churchPlanting: number;
    totalRemitted: number;
    totalShares: any;
  };
};
