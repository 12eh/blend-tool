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
          label="Minimum %"
          defaultValue={values.minA}
          min={0}
          onChange={(v) => setValues({ ...values, minA: v })}
        />
      </div>
      <div className="column-two form-area">
        <h1>Ingredient B</h1>
        <NumericInput
          id="min-b"
          label="Minimum %"
          defaultValue={values.minB}
          min={0}
          onChange={(v) => setValues({ ...values, minB: v })}
        />
      </div>
      <div className="column-three form-area">
        <h1>Ingredient C</h1>
        <NumericInput
          id="min-c"
          label="Minimum %"
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
  const { resolution } = props;
  const formValues = { ...defaultFormValues, ...props.formValues };
  const { minA, minB, minC } = formValues;

  const maxA = 100 - minB - minC;
  const maxB = 100 - minA - minC;
  const maxC = 100 - minA - minB;

  const samples: Array<[number, number, number, number]> = [];
  let sampleNum = 1;
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      if (i + j > resolution - 1) continue;
      samples.push([
        sampleNum++,
        minA + ((maxA - minA) * (resolution - i - j - 1)) / (resolution - 1),
        minB + ((maxB - minB) * j) / (resolution - 1),
        minC + ((maxC - minC) * i) / (resolution - 1),
      ]);
    }
  }

  return (
    <>
      <h1>Ranges</h1>
      A: {formValues.minA}% - {maxA}%<br />
      B: {formValues.minB}% - {maxB}%<br />
      C: {formValues.minC}% - {maxC}%<br />
      <h1>Table</h1>
      <table>
        <thead>
          <th>Sample #</th>
          <th>A%</th>
          <th>B%</th>
          <th>C%</th>
        </thead>
        <tbody>
          {samples.map((s) => (
            <tr key={s[0]}>
              {s.map((d, i) => (
                <td key={i}>{Math.round(d * 100) / 100}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
