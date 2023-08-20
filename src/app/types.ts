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
  breakdown?: {
    nhqtrs?: ShareValue;
    ahqtrs?: ShareValue;
    phqtrs?: ShareValue;
    zhqtrs?: ShareValue;
  };
};
