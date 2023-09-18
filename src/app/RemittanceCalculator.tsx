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

export function RemittanceCalculator() {
  const [totals, setTotals] = useState<string[]>(
    fields.map((field) =>
      field.value !== undefined ? String(field.value) : ""
    )
  );
  const [overallTotal, setOverallTotal] = useState("");
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
      breakdown.forEach((share) => {
        let { value, description, beneficiary } = share;
        if (value === undefined) return;

        let total = round(value * section.total);

        section.breakdown.push({
          beneficiary,
          description,
          total,
          percentage: value * 100,
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

    let churchPlanting = round(0.2 * (Number(overallTotal) - totalRemitted));

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

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <h3 className="text-3xl font-bold text-center pt-10 mb-6">
        Remittance Calculator
      </h3>

      <div className="grid lg:grid-cols-2 relative">
        <section className="w-full">
          <div className="text-xl px-8 lg:w-4/5 mx-auto">
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
