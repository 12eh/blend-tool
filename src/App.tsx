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
