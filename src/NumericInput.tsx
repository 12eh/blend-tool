import { useState, type ReactElement } from "react";

type Props = {
  id: string;
  label: string;
  defaultValue: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function NumericInput(props: Props): ReactElement<Props> {
  const { id, label, defaultValue, onChange, min, max, step } = props;
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          setValue(newValue);
          onChange(newValue);
        }}
      />
    </div>
  );
}
