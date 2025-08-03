import { useEffect, useState, type ReactElement } from "react";
import "./QuadraxialBlend.css";
import { IngredientForm } from "./IngredientForm";
import { parseColor, scale, sum, toCSS } from "./utils";

const defaultFormValues = {
  minA: 0,
  minB: 0,
  minC: 0,
  minD: 0,
  labelA: "Ingredient A",
  labelB: "Ingredient B",
  labelC: "Ingredient C",
  labelD: "Ingredient D",
  colorA: "00ffff",
  colorB: "ff00ff",
  colorC: "ffff00",
  colorD: "000000",
};
type FormValues = typeof defaultFormValues;
type FormProps = {
  onChange: (newValues: FormValues) => void;
};

export function QuadraxialBlendForm(props: FormProps): ReactElement<FormProps> {
  const { onChange } = props;
  const [values, setValues] = useState<FormValues>(defaultFormValues);

  useEffect(() => onChange(values), [onChange, values]);

  return (
    <div className="four-column">
      <div className="column-one form-area">
        <IngredientForm
          id="A"
          defaultColor="00ffff"
          onChange={(v) => setValues({ ...values, ...v })}
        />
      </div>
      <div className="column-two form-area">
        <IngredientForm
          id="B"
          defaultColor="ff00ff"
          onChange={(v) => setValues({ ...values, ...v })}
        />
      </div>
      <div className="column-three form-area">
        <IngredientForm
          id="C"
          defaultColor="ffff00"
          onChange={(v) => setValues({ ...values, ...v })}
        />
      </div>
      <div className="column-four form-area">
        <IngredientForm
          id="D"
          defaultColor="000000"
          onChange={(v) => setValues({ ...values, ...v })}
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
  percentD: number;
  i: number;
  j: number;
};

export function QuadraxialBlend(
  props: ResultsProps
): ReactElement<ResultsProps> {
  const { resolution } = props;
  const formValues = { ...defaultFormValues, ...props.formValues };
  const { minA, minB, minC, minD } = formValues;

  const maxA = 100 - minB - minC - minD;
  const maxB = 100 - minA - minC - minD;
  const maxC = 100 - minA - minB - minD;
  const maxD = 100 - minA - minB - minC;

  const samples: Array<Sample> = [];
  let sampleId = 1;
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const a =
        minA +
        ((maxA - minA) * Math.min(resolution - 1 - i, resolution - 1 - j)) /
          (resolution - 1);
      const b =
        minB +
        ((maxB - minB) * Math.min(i, resolution - 1 - j)) / (resolution - 1);
      const c = minC + ((maxC - minC) * Math.min(i, j)) / (resolution - 1);
      const d =
        minD +
        ((maxD - minD) * Math.min(resolution - 1 - i, j)) / (resolution - 1);
      const t = a + b + c + d;
      samples.push({
        id: sampleId++,
        percentA: (100 * a) / t,
        percentB: (100 * b) / t,
        percentC: (100 * c) / t,
        percentD: (100 * d) / t,
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
        id="quadraxial-visualization"
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
