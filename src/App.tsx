import { useState } from "react";
import "./App.css";
import { Dropdown } from "./Dropdown";
import { NumericInput } from "./NumericInput";

const BLEND_TYPES = [
  "triaxial",
  "quadraxial",
  "tetrahedral",
  "bilinear",
  "trilinear",
] as const;
type BlendType = (typeof BLEND_TYPES)[number];

function App() {
  const [blendType, setBlendType] = useState<BlendType>(BLEND_TYPES[0]);
  return (
    <div id="main-container">
      <div id="main-grid">
        <form
          id="main-form"
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
            defaultValue={3}
            step={1}
            min={2}
            onChange={console.log}
          />
        </form>
        <div id="results">{blendType == "triaxial" && <>Δ</>}</div>
      </div>
    </div>
  );
}

export default App;
