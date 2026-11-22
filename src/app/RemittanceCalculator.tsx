"use client";

import { useEffect, useState } from "react";
import { AnalysisSection } from "./types";
import { Analysis } from "./Analysis";
import { fields } from "./field";
import { NumberInput } from "./NumberInput";

function round(value: number, precision: number = 0) {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

type Rates = {
  breakdowns: Record<string, number[]>;
  churchPlanting: number;
};

const storageKey = "remittance-rates";
const defaultRates: Rates = {
  breakdowns: Object.fromEntries(
    fields.map((field) => [
      field.id,
      field.breakdown.map((share) => round(share.value * 100, 4)),
    ])
  ),
  churchPlanting: 20,
};

function isPercentage(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100;
}

function readRates(): Rates {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || "null");
    return {
      breakdowns: Object.fromEntries(
        fields.map((field) => [
          field.id,
          field.breakdown.map((_, index) => {
            const value = stored?.breakdowns?.[field.id]?.[index];
            return isPercentage(value) ? value : defaultRates.breakdowns[field.id][index];
          }),
        ])
      ),
      churchPlanting: isPercentage(stored?.churchPlanting)
        ? stored.churchPlanting
        : defaultRates.churchPlanting,
    };
  } catch {
    return defaultRates;
  }
}

export function RemittanceCalculator() {
  const [totals, setTotals] = useState<string[]>(
    fields.map((field) =>
      field.value !== undefined ? String(field.value) : ""
    )
  );
  const [overallTotal, setOverallTotal] = useState("");
  const [rates, setRates] = useState<Rates>(defaultRates);
  const [draftRates, setDraftRates] = useState<Rates>(defaultRates);
  const [rateMessage, setRateMessage] = useState("");
  const [analysis, setAnalysis] = useState<{
    analysis: any[];
    totals: {
      churchPlanting: number;
      totalRemitted: number;
      totalShares: any;
    };
  }>();

  const calculate = () => {
    let filled = fields.map((field, index) => {
      let total = Number(totals[index]);
      return {
        ...field,
        value: total,
      };
    });

    let analysis: AnalysisSection[] = [];

    filled.forEach((field) => {
      const section: AnalysisSection = {
        label: field.label,
        total: field.value,
        breakdown: [],
      };

      let { breakdown = [] } = field;
      breakdown.forEach((share, index) => {
        let { description, beneficiary } = share;
        const percentage = rates.breakdowns[field.id][index];
        const value = percentage / 100;
        let total = round(value * section.total);

        section.breakdown.push({
          beneficiary,
          description,
          total,
          percentage,
        });
      });

      analysis.push(section);
    });

    // calculate totals
    let totalShares: Record<string, number> = {};

    let totalRemitted = 0;

    analysis.forEach((each) => {
      let { breakdown } = each;
      breakdown.forEach((share) => {
        totalRemitted += share.total;
        totalShares[share.beneficiary] =
          (totalShares[share.beneficiary] ?? 0) + share.total;
      });
    });

    let churchPlanting = round((rates.churchPlanting / 100) * (Number(overallTotal) - totalRemitted));

    totalRemitted += churchPlanting;

    setAnalysis({
      analysis: analysis,
      totals: {
        totalRemitted,
        churchPlanting,
        totalShares,
      },
    });
  };

  useEffect(() => {
    const savedRates = readRates();
    setRates(savedRates);
    setDraftRates(savedRates);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <h3 className="text-3xl font-bold text-center pt-10 mb-6">
        Remittance Calculator
      </h3>

      <div className="grid lg:grid-cols-2 relative">
        <section className="w-full">
          <div className="text-xl px-8 lg:w-4/5 mx-auto">
            <details className="mb-8">
              <summary className="cursor-pointer font-medium">Set remittance percentages</summary>
              <form
                className="mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    !isPercentage(draftRates.churchPlanting) ||
                    !fields.every((field) => draftRates.breakdowns[field.id].every(isPercentage))
                  ) {
                    setRateMessage("Enter percentages between 0 and 100.");
                    return;
                  }
                  try {
                    localStorage.setItem(storageKey, JSON.stringify(draftRates));
                    setRates(draftRates);
                    setAnalysis(undefined);
                    setRateMessage("Percentages saved on this device.");
                  } catch {
                    setRateMessage("Could not save percentages on this device.");
                  }
                }}
              >
                {fields.map((field) => (
                  <fieldset key={field.id} className="mb-4">
                    <legend className="font-medium">{field.label}</legend>
                    {field.breakdown.map((share, index) => (
                      <label key={index} className="flex items-center justify-between gap-4 text-base mt-2">
                        <span className="uppercase">
                          {share.beneficiary}{share.description ? ` — ${share.description}` : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="any"
                            required
                            className="border border-green-500 rounded-md w-24 px-2 py-1"
                            value={Number.isNaN(draftRates.breakdowns[field.id][index]) ? "" : draftRates.breakdowns[field.id][index]}
                            onChange={(e) => {
                              const value = e.target.valueAsNumber;
                              setDraftRates((current) => ({
                                ...current,
                                breakdowns: {
                                  ...current.breakdowns,
                                  [field.id]: current.breakdowns[field.id].map((rate, i) =>
                                    i === index ? value : rate
                                  ),
                                },
                              }));
                              setRateMessage("");
                            }}
                          />
                          %
                        </span>
                      </label>
                    ))}
                  </fieldset>
                ))}
                <label className="flex items-center justify-between gap-4 text-base mb-4">
                  Church planting
                  <span className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="any"
                      required
                      className="border border-green-500 rounded-md w-24 px-2 py-1"
                      value={Number.isNaN(draftRates.churchPlanting) ? "" : draftRates.churchPlanting}
                      onChange={(e) => {
                        setDraftRates((current) => ({ ...current, churchPlanting: e.target.valueAsNumber }));
                        setRateMessage("");
                      }}
                    />
                    %
                  </span>
                </label>
                <div className="flex flex-wrap gap-3 text-base">
                  <button type="submit" className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-400">
                    Save percentages
                  </button>
                  <button type="button" className="border border-green-500 px-4 py-2 rounded-md" onClick={() => {
                    setDraftRates(defaultRates);
                    setRateMessage("Default percentages restored. Save to apply them.");
                  }}>
                    Restore defaults
                  </button>
                </div>
                {rateMessage && <p role="status" className="text-base mt-2">{rateMessage}</p>}
              </form>
            </details>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                calculate();
              }}
            >
              <div className="fields grid gap-6">
                <NumberInput
                  label="Overall Total"
                  value={overallTotal}
                  onChange={setOverallTotal}
                  required
                />

                {fields.map((field, index) => (
                  <div key={field.id}>
                    <NumberInput
                      label={field.label}
                      value={totals[index]}
                      onChange={(value) => {
                        let newTotals = [...totals];
                        newTotals[index] = value ? value : "";
                        setTotals(newTotals);
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button className="bg-green-500 text-xl h-16 px-20 rounded-md text-white capitalize font-medium transition-colors hover:bg-green-400">
                  submit
                </button>
              </div>
            </form>
          </div>
        </section>
        {analysis && (
          <section className="absolute top-0 left-0 bg-gray-50 px-4 right-0 bottom-0 overflow-auto lg:static">
            <div className="mb-2">
              <button
                onClick={() => setAnalysis(undefined)}
                className=" lg:hidden px-4 py-2 text-red-500 rounded-full shadow-sm text-xl  border border-red-500 hover:bg-red-500 hover:text-white"
              >
                close
              </button>
            </div>
            <div>
              <Analysis analysis={analysis} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
