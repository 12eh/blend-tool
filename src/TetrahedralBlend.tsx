import { useEffect, useState, type ReactElement } from "react";
import "./TetrehedralBlend.css";
import { IngredientForm } from "./IngredientForm";
import { parseColor, scale, sum, toCSS } from "./utils";
import { Dropdown } from "./Dropdown";

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

export function TetrahedralBlendForm(
  props: FormProps
): ReactElement<FormProps> {
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
  h: number;
  i: number;
  j: number;
};

export function TetrahedralBlend(
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
  for (let h = 0; h < resolution; h++) {
    for (let i = 0; i < resolution - h; i++) {
      for (let j = 0; j < resolution - h; j++) {
        if (i + j > resolution - 1 - h) continue;
        samples.push({
          id: sampleId++,
          percentA:
            minA +
            ((maxA - minA) * (resolution - 1 - i - j - h)) / (resolution - 1),
          percentB: minB + ((maxB - minB) * j) / (resolution - 1),
          percentC: minC + ((maxC - minC) * i) / (resolution - 1),
          percentD: minD + ((maxD - minD) * h) / (resolution - 1),
          h,
          i,
          j,
        });
      }
    }
  }

  const [vizType, setVizType] = useState("stacked");

  return (
    <>
      <h1>Ranges</h1>
      {formValues.labelA}: {formValues.minA}% - {maxA}%<br />
      {formValues.labelB}: {formValues.minB}% - {maxB}%<br />
      {formValues.labelC}: {formValues.minC}% - {maxC}%<br />
      {formValues.labelD}: {formValues.minD}% - {maxD}%<br />
      <h1>Visualization</h1>
      <div className="form-area">
        <Dropdown
          id="tetrahedral-viz-type"
          label="Type"
          values={["stacked", "unstacked"]}
          onChange={setVizType}
        />
      </div>
      <div
        id="tetrahedral-visualization"
        style={{
          height: `${
            vizType == "unstacked"
              ? 72 * resolution * ((resolution + 1) / 2)
              : 96 * resolution
          }px`,
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
          const left = (50 * (resolution - 1 - s.i + s.j)) / resolution;
          let top = ((s.i + s.j) * 100) / resolution;
          if (vizType == "stacked") {
            top += (50 * s.h) / resolution;
          } else {
            top /= (resolution + 1) / 2;
            top +=
              (200 * (s.h - (s.h * (s.h - 1)) / (2 * resolution))) /
              (resolution + 1);
          }
          return (
            <div
              className="sample"
              style={{
                left: `${left}%`,
                top: `${top}%`,
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
