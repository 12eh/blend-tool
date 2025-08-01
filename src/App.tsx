import "./App.css";
import { Dropdown } from "./Dropdown";
import { NumericInput } from "./NumericInput";

function App() {
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
            id="type"
            label="Type"
            values={[
              "triaxial",
              "quadraxial",
              "tetrahedral",
              "bilinear",
              "trilinear",
            ]}
            onChange={console.log}
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
      </div>
    </div>
  );
}

export default App;
