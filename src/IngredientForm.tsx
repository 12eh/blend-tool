import { useEffect, useState, type ReactElement } from "react";
import { TextInput } from "./TextInput";
import { NumericInput } from "./NumericInput";

type Props = {
  id: string;
  defaultColor: string;
  onChange: (newValues: { [k: string]: string | number }) => void;
};

export function IngredientForm(props: Props): ReactElement<Props> {
  const { id, defaultColor, onChange } = props;
  const labelKey = `label${id}`;
  const colorKey = `color${id}`;
  const minKey = `min${id}`;
  const [values, setValues] = useState({
    [labelKey]: `Ingredient ${id}`,
    [colorKey]: defaultColor,
    [minKey]: 0,
  });

  useEffect(() => onChange(values), [values]);

  return (
    <>
      <h1>{values[labelKey]}</h1>
      <TextInput
        id={labelKey}
        label="Label"
        defaultValue={values[labelKey] as string}
        onChange={(v) => setValues({ ...values, [labelKey]: v })}
      />
      <TextInput
        id={colorKey}
        label="Color"
        defaultValue={values[colorKey] as string}
        onChange={(v) => setValues({ ...values, [colorKey]: v })}
      />
      <NumericInput
        id={minKey}
        label="Minimum %"
        defaultValue={values[minKey] as number}
        min={0}
        onChange={(v) => setValues({ ...values, [minKey]: v })}
      />
    </>
  );
}
