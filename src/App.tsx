import { useState } from "react";
import "./App.css";
import { Dropdown } from "./Dropdown";
import { NumericInput } from "./NumericInput";
import { TriaxialBlend, TriaxialBlendForm } from "./TriaxialBlend";
import { QuadraxialBlend, QuadraxialBlendForm } from "./QuadraxialBlend";

const BLEND_TYPES = [
  "triaxial",
  "quadraxial",
  "tetrahedral",
  "bilinear",
  "trilinear",
] as const;
type BlendType = (typeof BLEND_TYPES)[number];

function App() {
  const [resolution, setResolution] = useState(4);
  const [blendType, setBlendType] = useState<BlendType>(BLEND_TYPES[0]);
  const [conditionalFormValues, setConditionalFormValues] = useState<{
    [k: string]: number | string;
  }>({});
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
            <TriaxialBlendForm onChange={setConditionalFormValues} />
          )}
          {blendType == "quadraxial" && (
            <QuadraxialBlendForm onChange={setConditionalFormValues} />
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
