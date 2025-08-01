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
        <b>Ingredient A</b>
        <NumericInput
          id="min-a"
          label="Min%"
          defaultValue={values.minA}
          min={0}
          onChange={(v) => setValues({ ...values, minA: v })}
        />
      </div>
      <div className="column-two form-area">
        <b>Ingredient B</b>
        <NumericInput
          id="min-b"
          label="Min%"
          defaultValue={values.minB}
          min={0}
          onChange={(v) => setValues({ ...values, minB: v })}
        />
      </div>
      <div className="column-three form-area">
        <b>Ingredient C</b>
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

  return <>{JSON.stringify(formValues)}</>;
}
