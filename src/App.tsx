import { useEffect, useState } from "react";
import "./App.css";
import { Dropdown } from "./Dropdown";
import { NumericInput } from "./NumericInput";
import { TriaxialBlend, TriaxialBlendForm } from "./TriaxialBlend";
import { QuadraxialBlend, QuadraxialBlendForm } from "./QuadraxialBlend";
import { TetrahedralBlend, TetrahedralBlendForm } from "./TetrahedralBlend";
import { BilinearBlend, BilinearBlendForm } from "./BilinearBlend";

const BLEND_TYPES = [
  "triaxial",
  "tetrahedral",
  "bilinear",
  "quadraxial",
] as const;
type BlendType = (typeof BLEND_TYPES)[number];
type ConditionalFormValues = { [k: string]: number | string };

function App() {
  const savedJSON = localStorage.getItem("latest");
  let savedBlendType: BlendType | undefined = undefined;
  let savedResolution: number | undefined = undefined;
  let savedConditionalFormValues: ConditionalFormValues | undefined = undefined;
  if (savedJSON) {
    const saved = JSON.parse(savedJSON) as {
      blendType: BlendType;
      resolution: number;
      conditionalFormValues: ConditionalFormValues;
    };
    savedBlendType = saved.blendType;
    savedResolution = saved.resolution;
    savedConditionalFormValues = saved.conditionalFormValues;
  }

  const [blendType, setBlendType] = useState<BlendType>(
    savedBlendType || BLEND_TYPES[0]
  );
  const [resolution, setResolution] = useState(savedResolution || 4);
  const [conditionalFormValues, setConditionalFormValues] =
    useState<ConditionalFormValues>(
      (savedConditionalFormValues || {}) as ConditionalFormValues
    );

  useEffect(
    () =>
      localStorage.setItem(
        "latest",
        JSON.stringify({ blendType, resolution, conditionalFormValues })
      ),
    [blendType, resolution, conditionalFormValues]
  );

  return (
    <div id="main-container">
      <div id="main-grid">
        <form
          id="main-form"
          className="form-area"
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
            }
          }}
        >
          <Dropdown
            id="blend-type"
            label="Type"
            values={BLEND_TYPES}
            selectedValue={blendType}
            onChange={(v) => setBlendType(v as BlendType)}
          />
          {blendType == "triaxial" && (
            <p>
              A triaxial blend evenly covers all possible combinations of three
              ingredients. Samples can be laid out in a triangle to see an even
              gradient between the corners.
            </p>
          )}
          {blendType == "tetrahedral" && (
            <p>
              A tetrahedral blend evenly covers all possible combinations of
              four ingredients. Samples can be stacked into a 3-sided pyramid to
              see an even gradient between the four corners.
            </p>
          )}
          {blendType == "bilinear" && (
            <p>
              A bilinear blend takes two pairs of two ingredients, and blends
              them such that the ratio of (A+B) to (C+D) is constant. For
              example you might have two different fluxes and two different
              clays, but you know you want the final mix to be 60% flux and 40%
              clay. Samples can be laid out in a rectangle to see an even
              gradient between opposite edges.
            </p>
          )}
          {blendType == "quadraxial" && (
            <p>
              A quadraxial blend evenly covers a subset of the possible
              combinations of four ingredients, in a way that requires fewer
              samples than the tetrahedral method and doesn't require thinking
              in 3D. Samples can be arranged into a rectangle to see an even
              gradient between the four corners.
            </p>
          )}
          <NumericInput
            id="resolution"
            label="Resolution"
            defaultValue={resolution}
            step={1}
            min={2}
            onChange={setResolution}
          />
          <hr />
          {blendType == "triaxial" && (
            <TriaxialBlendForm
              values={conditionalFormValues}
              onChange={setConditionalFormValues}
            />
          )}
          {blendType == "tetrahedral" && (
            <TetrahedralBlendForm
              values={conditionalFormValues}
              onChange={setConditionalFormValues}
            />
          )}
          {blendType == "bilinear" && (
            <BilinearBlendForm
              values={conditionalFormValues}
              onChange={setConditionalFormValues}
            />
          )}
          {blendType == "quadraxial" && (
            <QuadraxialBlendForm
              values={conditionalFormValues}
              onChange={setConditionalFormValues}
            />
          )}
        </form>
        <hr />
        <div id="results">
          {blendType == "triaxial" && (
            <TriaxialBlend
              resolution={resolution}
              formValues={conditionalFormValues}
            />
          )}
          {blendType == "tetrahedral" && (
            <TetrahedralBlend
              resolution={resolution}
              formValues={conditionalFormValues}
            />
          )}
          {blendType == "bilinear" && (
            <BilinearBlend
              resolution={resolution}
              formValues={conditionalFormValues}
            />
          )}
          {blendType == "quadraxial" && (
            <QuadraxialBlend
              resolution={resolution}
              formValues={conditionalFormValues}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
