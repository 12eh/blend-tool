import { useState, type ReactElement } from "react";

type Props = {
  id: string;
  label: string;
  defaultValue: string;
  onChange: (newValue: string) => void;
};

export function TextInput(props: Props): ReactElement<Props> {
  const { id, label, defaultValue, onChange } = props;
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={value}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);
          onChange(newValue);
        }}
      />
    </>
  );
}
