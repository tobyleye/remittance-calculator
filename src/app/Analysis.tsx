import { AnalysisSection } from "./types";

export function Analysis({ analysis }: { analysis: AnalysisSection[] }) {
  return (
    <div>
      {analysis.map((section) => (
        <section
          className="border-b border-gray-400 mb-4 py-2"
          key={section.label}
        >
          <h3 className="text-2xl mb-2 font-bold">{section.label}</h3>

          <div>
            <div>
              Total(100%) -{" "}
              <span className="border-b border-black">
                {section.total.toLocaleString()}
              </span>
            </div>
            {section.breakdown.map((breakdown, index) => (
              <div key={`${section.label}-breakdown-${index}`}>
                <span className="font-normal">
                  {breakdown.label}({breakdown.percentage}%)
                </span>
                -{" "}
                <span className="font-semibold border-b border-black">
                  {breakdown.total.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
