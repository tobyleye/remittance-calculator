import { Field } from "./types";

export const fields: Field[] = [
  {
    label: "Ministers Tithe",
    id: "membersTithe",
    breakdown: { nhqtrs: 0.64 },
  },
  {
    label: "Congregation Tithe",
    id: "congregationTithe",
    breakdown: {
      nhqtrs: 0.64,
    },
  },
  {
    label: "Thanksgiving",
    id: "thanksgiving",
    breakdown: {
      nhqtrs: 0.7,
      phqtrs: 0.05,
      ahqtrs: 0.05,
      zhqtrs: {
        value: 0.05,
        label: "1% Pastors seed forum",
      },
    },
  },
  {
    label: "Sunday love offering",
    id: "sundayLoveOffering",
    breakdown: {
      nhqtrs: 0.1,
      ahqtrs: 0.1,
    },
  },
  {
    label: "Crm",
    id: "crm",
    breakdown: {
      nhqtrs: 0.5,
    },
  },
  {
    label: "Gospel fund",
    id: "workersOffering",
    breakdown: {
      nhqtrs: 0.25,
    },
  },
  {
    label: "Children Offering",
    id: "childrensOffering",
    breakdown: {
      nhqtrs: 0.35,
    },
  },
  {
    label: "Sunday School",
    id: "sundaySchoolOffering",
    breakdown: {
      nhqtrs: 0.5,
    },
  },
];
