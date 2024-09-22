import { Field, Beneficiary } from "./types";

export const fields: Field[] = [
  {
    label: "Ministers Tithe",
    id: "membersTithe",
    breakdown: [{ beneficiary: Beneficiary.nhqtrs, value: 0.63}],
  },
  {
    label: "Congregation Tithe",
    id: "congregationTithe",
    breakdown: [
      {
        beneficiary: Beneficiary.nhqtrs,
        value: 0.58,
      },
      {
        beneficiary: Beneficiary.zhqtrs,
        value: 0.035,
      },
    ],
  },
  {
    label: "Thanksgiving",
    id: "thanksgiving",
    breakdown: [
      {
        beneficiary: Beneficiary.nhqtrs,
        value: 0.7,
      },
      {
        beneficiary: Beneficiary.phqtrs,
        value: 0.05,
      },
      {
        beneficiary: Beneficiary.ahqtrs,
        value: 0.05,
      },
      {
        beneficiary: Beneficiary.nhqtrs,
        value: 0.01,
        description: "1% Pastors seed forum",
      },
    ],
  },
  {
    label: "Sunday love offering",
    id: "sundayLoveOffering",
    breakdown: [
      {
        beneficiary: Beneficiary.nhqtrs,
        value: 0.3,
      },
      {
        beneficiary: Beneficiary.ahqtrs,
        value: 0.1,
      },
    ],
  },
  {
    label: "Crm",
    id: "crm",
    breakdown: [
      {
        beneficiary: Beneficiary.nhqtrs,
        value: 0.6,
      },
    ],
  },
  {
    label: "Gospel fund (workers offering)",
    id: "workersOffering",
    breakdown: [
      {
        beneficiary: Beneficiary.nhqtrs,
        value: 0.25,
      },
    ],
  },
  {
    label: "Children Offering",
    id: "childrensOffering",
    breakdown: [
      {
        beneficiary: Beneficiary.nhqtrs,
        value: 0.35,
      },
    ],
  },
  {
    label: "Sunday School",
    id: "sundaySchoolOffering",
    breakdown: [
      {
        beneficiary: Beneficiary.nhqtrs,
        value: 0.5,
      },
    ],
  },
  {
    label: "RUN EDU FUND",
    id: "runEduFund",
    value: 1000,
    breakdown: [
      {
        beneficiary: Beneficiary.nhqtrs,
        value: 1,
      },
    ],
  },
  {
    label: "National CSR Fund",
    id: "nationalCSRFund",
    value: 500,
    breakdown: [
      {
        beneficiary: Beneficiary.nhqtrs,
        value: 1,
      },
    ],
  },
];
