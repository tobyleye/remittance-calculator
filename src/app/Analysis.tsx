import { Analysis } from "./types";
export function Analysis({ analysis }: { analysis: Analysis }) {
  return (
    <div>
      {analysis.analysis.map((section) => (
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
            {section.breakdown.map((breakdown: any, index: number) => (
              <div key={`${section.label}-breakdown-${index}`}>
                <span className="font-normal">
                  {breakdown.label}({breakdown.percentage}%)
                </span>
                -{" "}
                <span className="font-semibold border-b border-black">
                  {breakdown.total.toLocaleString()}
                </span>
                {breakdown.alias && (
                  <span className="italic text-sm ml-2">
                    ({breakdown.alias})
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div>
        <h3 className="mb-4 font-bold">Total everyting</h3>

        <div>
          {Object.entries(analysis.totals).map(([key, value]) => {
            if (key === "totalShares") {
              return (
                <div key={key}>
                  {Object.entries(value).map(([share, shareValue]) => {
                    return (
                      <div className="flex " key={share}>
                        <span className="mr-2">{share}:</span>
                        <span>
                          <Num num={shareValue as number} />{" "}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              return (
                <div className="flex items-center gap-4" key={key}>
                  {key}:
                  <Num num={value} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

const Num = ({ num }: { num: string | number }) => {
  return <div className="font-medium">{Number(num).toLocaleString()}</div>;
};
