"use client";

export const NumberInput = ({
  value,
  onChange,
  required = false,
  label,
}: {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  required?: boolean;
}) => {
  const handleChange = (value: string) => {
    value = value.replace(/\,/g, "");
    let valueToNum = Number(value);
    if (Number.isNaN(valueToNum)) {
      return;
    }
    onChange(value);
  };

  const formattedValue =
    value.trim() !== "" ? Number(value).toLocaleString() : value;

  return (
    <div>
      {label && (
        <div className="mb-1">
          <label className="font-medium capitalize inline-block">{label}</label>
        </div>
      )}
      <input
        inputMode="decimal"
        required={required}
        className=" appearance-none border border-green-500 h-12 w-full rounded-md px-5 outline-none focus:outline-none"
        value={formattedValue}
        onChange={(e) => {
          console.log("cha");
          handleChange(e.target.value);
        }}
      />
    </div>
  );
};
