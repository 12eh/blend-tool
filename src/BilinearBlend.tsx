import { useEffect, useState, type ReactElement } from "react";
import "./BilinearBlend.css";
import { NumericInput } from "./NumericInput";
import { TextInput } from "./TextInput";
import { parseColor, scale, sum, toCSS } from "./utils";

const defaultFormValues = {
  percentAB: 50,
  minA: 0,
  minB: 0,
  minC: 0,
  minD: 0,
  labelA: "A",
  labelB: "B",
  labelC: "C",
  labelD: "D",
  colorA: "00ffff",
  colorB: "ff00ff",
  colorC: "ffff00",
  colorD: "000000",
};
type FormValues = typeof defaultFormValues;
type FormProps = {
  onChange: (newValues: FormValues) => void;
};

export function BilinearBlendForm(props: FormProps): ReactElement<FormProps> {
  const { onChange } = props;
  const [values, setValues] = useState<FormValues>(defaultFormValues);

  useEffect(() => onChange(values), [onChange, values]);

  return (
    <>
      <NumericInput
        id="percent-ab"
        label="% A/B"
        defaultValue={values.percentAB}
        onChange={(v) => setValues({ ...values, percentAB: v })}
      />
      <div className="four-column">
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
        <div className="column-four form-area">
          <h1>Ingredient D</h1>
          <TextInput
            id="label-d"
            label="Label"
            defaultValue={values.labelD}
            onChange={(v) => setValues({ ...values, labelD: v })}
          />
          <TextInput
            id="color-d"
            label="Color"
            defaultValue={values.colorD}
            onChange={(v) => setValues({ ...values, colorD: v })}
          />
          <NumericInput
            id="min-d"
            label="Minimum %"
            defaultValue={values.minD}
            min={0}
            onChange={(v) => setValues({ ...values, minD: v })}
          />
        </div>
      </div>
    </>
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
  percentD: number;
  i: number;
  j: number;
};

export function BilinearBlend(props: ResultsProps): ReactElement<ResultsProps> {
  const { resolution } = props;
  const formValues = { ...defaultFormValues, ...props.formValues };
  const { percentAB, minA, minB, minC, minD } = formValues;

  const maxA = percentAB - minB;
  const maxB = percentAB - minA;
  const maxC = 100 - percentAB - minD;
  const maxD = 100 - percentAB - minC;

  const samples: Array<Sample> = [];
  let sampleId = 1;
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      samples.push({
        id: sampleId++,
        percentA: minA + ((maxA - minA) * i) / (resolution - 1),
        percentB:
          minB + ((maxB - minB) * (resolution - 1 - i)) / (resolution - 1),
        percentC: minC + ((maxC - minC) * j) / (resolution - 1),
        percentD:
          minD + ((maxD - minD) * (resolution - 1 - j)) / (resolution - 1),
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
      {formValues.labelD}: {formValues.minD}% - {maxD}%<br />
      <h1>Visualization</h1>
      <div
        id="bilinear-visualization"
        style={{
          height: `${80 * resolution}px`,
          width: `${128 * resolution}px`,
        }}
      >
        {samples.map((s) => {
          const color = sum(
            scale(parseColor(formValues.colorA), s.percentA / 100),
            scale(parseColor(formValues.colorB), s.percentB / 100),
            scale(parseColor(formValues.colorC), s.percentC / 100),
            scale(parseColor(formValues.colorD), s.percentD / 100)
          );
          return (
            <div
              className="sample"
              style={{
                left: `${(100 * s.i) / resolution}%`,
                top: `${(100 * s.j) / resolution}%`,
                background: toCSS(color),
              }}
            >
              #{s.id}
              <br />
              {Math.round(s.percentA)}/{Math.round(s.percentB)}/
              {Math.round(s.percentC)}/{Math.round(s.percentD)}
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
          <th>% {formValues.labelD}</th>
        </thead>
        <tbody>
          {samples.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{Math.round(s.percentA * 100) / 100}</td>
              <td>{Math.round(s.percentB * 100) / 100}</td>
              <td>{Math.round(s.percentC * 100) / 100}</td>
              <td>{Math.round(s.percentD * 100) / 100}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
