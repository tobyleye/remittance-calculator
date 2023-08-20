"use client";

import { useEffect, useState } from "react";
import { AnalysisSection } from "./types";
import { Analysis } from "./Analysis";
import { fields } from "./field";

export function RemittanceCalculator() {
  const [totals, setTotals] = useState<string[]>(fields.map((field) => field.value !== undefined ? String(field.value) : ""));
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

      let { nhqtrs, ahqtrs, phqtrs, zhqtrs } = field.breakdown ?? {};

      [
        {
          label: "NHQTRS",
          value: nhqtrs,
        },
        {
          label: "AHQTRS",
          value: ahqtrs,
        },
        {
          label: "PHQTRS",
          value: phqtrs,
        },
        {
          label: "ZHQTRS",
          value: zhqtrs,
        },
      ].forEach((share) => {
        let { value } = share;
        if (value !== undefined) {
          if (typeof value === "object") {
            section.breakdown.push({
              label: share.label,
              total: value.value * section.total,
              alias: value.label,
              percentage: value.value * 100,
            });
          } else {
            section.breakdown.push({
              label: share.label,
              total: value * section.total,
              percentage: value * 100,
            });
          }
        }
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
        totalShares[share.label] =
          (totalShares[share.label] ?? 0) + share.total;
      });
    });

    let churchPlanting = 0.2 * (Number(overallTotal) - totalRemitted);

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
            <div className="fields grid gap-4">
              <div className="flex flex-col">
                <label>Overall Total</label>
                <input
                  type="number"
                  value={overallTotal}
                  required
                  onChange={(e) => setOverallTotal(e.target.value)}
                  className=" appearance-none border border-green-500 h-12 rounded-md px-5 outline-none focus:outline-none"
                />
              </div>
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-2">
                  <label className="font-medium">{field.label}</label>
                  <input
                    type="number"
                    className=" appearance-none border border-green-500 h-12 rounded-md px-5 outline-none focus:outline-none"
                    value={totals[index]}
                    onChange={(e) => {
                      let value = e.target.value;
                      let newTotals = [...totals];
                      newTotals[index] = value ? value : "";

                      setTotals(newTotals);
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={calculate}
                className="bg-green-500 text-xl h-16 px-20 rounded-md text-white capitalize font-medium transition-colors hover:bg-green-400"
              >
                submit
              </button>
            </div>
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
