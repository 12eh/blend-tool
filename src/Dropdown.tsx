import { useState, type ReactElement } from "react";

type Props = {
  id: string;
  label: string;
  values: string[] | readonly string[];
  onChange: (newValue: string) => void;
  min?: number;
  max?: number;
  step?: number;
};

export function Dropdown(props: Props): ReactElement<Props> {
  const { id, label, values, onChange } = props;
  const [value, setValue] = useState(values[0]);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          onChange(newValue);
        }}
      >
        {values.map((v) => (
          <option value={v} key={v}>
            {v}
          </option>
        ))}
      </select>
    </>
  );
}
