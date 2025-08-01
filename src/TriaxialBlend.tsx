import { useEffect, useState, type ReactElement } from "react";
import { NumericInput } from "./NumericInput";

type FormValues = {
  minA: number;
  minB: number;
  minC: number;
};
type FormProps = {
  onChange: (newValues: FormValues) => void;
};

export function TriaxialBlendForm(props: FormProps): ReactElement<FormProps> {
  const { onChange } = props;
  const [values, setValues] = useState<FormValues>({
    minA: 0,
    minB: 0,
    minC: 0,
  });

  useEffect(() => onChange(values), [onChange, values]);

  return (
    <>
      <NumericInput
        id="min-a"
        label="Min% A"
        defaultValue={values.minA}
        min={0}
        onChange={(v) => setValues({ ...values, minA: v })}
      />
      <NumericInput
        id="min-b"
        label="Min% B"
        defaultValue={values.minB}
        min={0}
        onChange={(v) => setValues({ ...values, minB: v })}
      />
      <NumericInput
        id="min-c"
        label="Min% C"
        defaultValue={values.minC}
        min={0}
        onChange={(v) => setValues({ ...values, minC: v })}
      />
    </>
  );
}

type ResultsProps = {
  resolution: number;
  formValues: Partial<FormValues>;
};

export function TriaxialBlend(props: ResultsProps): ReactElement<ResultsProps> {
  const { formValues } = props;

  return <div id="results">{JSON.stringify(formValues)}</div>;
}
