import { useEffect, useState, type ReactElement } from "react";
import "./TriaxialBlend.css";
import { NumericInput } from "./NumericInput";
import { TextInput } from "./TextInput";
import { parseColor, scale, sum, toCSS } from "./utils";

const defaultFormValues = {
  minA: 0,
  minB: 0,
  minC: 0,
  labelA: "A",
  labelB: "B",
  labelC: "C",
  colorA: "00ffff",
  colorB: "ff00ff",
  colorC: "ffff00",
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
        <TextInput
          id="label-a"
          label="Label"
          defaultValue={values.labelA}
          onChange={(v) => setValues({ ...values, labelA: v })}
        />
        <TextInput
          id="color-a"
          label="Color"
          defaultValue={values.colorA}
          onChange={(v) => setValues({ ...values, colorA: v })}
        />
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
        <TextInput
          id="label-b"
          label="Label"
          defaultValue={values.labelB}
          onChange={(v) => setValues({ ...values, labelB: v })}
        />
        <TextInput
          id="color-b"
          label="Color"
          defaultValue={values.colorB}
          onChange={(v) => setValues({ ...values, colorB: v })}
        />
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
        <TextInput
          id="label-c"
          label="Label"
          defaultValue={values.labelC}
          onChange={(v) => setValues({ ...values, labelC: v })}
        />
        <TextInput
          id="color-c"
          label="Color"
          defaultValue={values.colorC}
          onChange={(v) => setValues({ ...values, colorC: v })}
        />
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

type Sample = {
  id: number;
  percentA: number;
  percentB: number;
  percentC: number;
  i: number;
  j: number;
};

export function TriaxialBlend(props: ResultsProps): ReactElement<ResultsProps> {
  const { resolution } = props;
  const formValues = { ...defaultFormValues, ...props.formValues };
  const { minA, minB, minC } = formValues;

  const maxA = 100 - minB - minC;
  const maxB = 100 - minA - minC;
  const maxC = 100 - minA - minB;

  const samples: Array<Sample> = [];
  let sampleId = 1;
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      if (i + j > resolution - 1) continue;
      samples.push({
        id: sampleId++,
        percentA:
          minA + ((maxA - minA) * (resolution - i - j - 1)) / (resolution - 1),
        percentB: minB + ((maxB - minB) * j) / (resolution - 1),
        percentC: minC + ((maxC - minC) * i) / (resolution - 1),
        i,
        j,
      });
    }
  }

  return (
    <>
      <h1>Ranges</h1>
      {formValues.labelA}: {formValues.minA}% - {maxA}%<br />
      {formValues.labelB}: {formValues.minB}% - {maxB}%<br />
      {formValues.labelC}: {formValues.minC}% - {maxC}%<br />
      <h1>Visualization</h1>
      <div
        id="triaxial-visualization"
        style={{
          height: `${75 * resolution}px`,
          width: `${100 * resolution}px`,
        }}
      >
        {samples.map((s) => {
          const color = sum(
            scale(parseColor(formValues.colorA), s.percentA / 100),
            scale(parseColor(formValues.colorB), s.percentB / 100),
            scale(parseColor(formValues.colorC), s.percentC / 100)
          );
          return (
            <div
              className="sample"
              style={{
                left: `${(50 * (resolution - 1 - s.i + s.j)) / resolution}%`,
                top: `${((s.i + s.j) * 100) / resolution}%`,
                background: toCSS(color),
              }}
            >
              #{s.id}
              <br />
              {Math.round(s.percentA)}/{Math.round(s.percentB)}/
              {Math.round(s.percentC)}
            </div>
          );
        })}
      </div>
      <h1>Table</h1>
      <table>
        <thead>
          <th>Sample #</th>
          <th>% {formValues.labelA}</th>
          <th>% {formValues.labelB}</th>
          <th>% {formValues.labelC}</th>
        </thead>
        <tbody>
          {samples.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{Math.round(s.percentA * 100) / 100}</td>
              <td>{Math.round(s.percentB * 100) / 100}</td>
              <td>{Math.round(s.percentC * 100) / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
