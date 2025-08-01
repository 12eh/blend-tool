import { useEffect, useState, type ReactElement } from "react";
import "./TriaxialBlend.css";
import { NumericInput } from "./NumericInput";

const defaultFormValues = {
  minA: 0,
  minB: 0,
  minC: 0,
};
type FormValues = typeof defaultFormValues;
type FormProps = {
  onChange: (newValues: FormValues) => void;
};

export function TriaxialBlendForm(props: FormProps): ReactElement<FormProps> {
  const { onChange } = props;
  const [values, setValues] = useState<FormValues>(defaultFormValues);

  useEffect(() => onChange(values), [onChange, values]);

  return (
    <div className="three-column">
      <div className="column-one form-area">
        <h1>Ingredient A</h1>
        <NumericInput
          id="min-a"
          label="Min%"
          defaultValue={values.minA}
          min={0}
          onChange={(v) => setValues({ ...values, minA: v })}
        />
      </div>
      <div className="column-two form-area">
        <h1>Ingredient B</h1>
        <NumericInput
          id="min-b"
          label="Min%"
          defaultValue={values.minB}
          min={0}
          onChange={(v) => setValues({ ...values, minB: v })}
        />
      </div>
      <div className="column-three form-area">
        <h1>Ingredient C</h1>
        <NumericInput
          id="min-c"
          label="Min%"
          defaultValue={values.minC}
          min={0}
          onChange={(v) => setValues({ ...values, minC: v })}
        />
      </div>
    </div>
  );
}

type ResultsProps = {
  resolution: number;
  formValues: Partial<FormValues>;
};

export function TriaxialBlend(props: ResultsProps): ReactElement<ResultsProps> {
  const formValues = { ...defaultFormValues, ...props.formValues };
  const { minA, minB, minC } = formValues;

  const maxA = 100 - minB - minC;
  const maxB = 100 - minA - minC;
  const maxC = 100 - minA - minB;

  return (
    <>
      <h1>Ranges</h1>
      A: {formValues.minA}% - {maxA}%<br />
      B: {formValues.minB}% - {maxB}%<br />
      C: {formValues.minC}% - {maxC}%<br />
    </>
  );
}
