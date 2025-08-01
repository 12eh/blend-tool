import "./App.css";
import { NumericInput } from "./NumericInput";

function App() {
  return (
    <div id="main-container">
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
      </form>
    </div>
  );
}

export default App;
