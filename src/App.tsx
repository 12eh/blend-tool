import "./App.css";
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
          <NumericInput
            id="resolution"
            label="Resolution"
            defaultValue={3}
            onChange={console.log}
          />
          <NumericInput
            id="asdf"
            label="asdf"
            defaultValue={0}
            onChange={console.log}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
