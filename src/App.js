import './components/GrainMayhem/grain-mayhem.js'
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Time from "./components/Time/Time";
import Weather from "./components/Weather/Weather";
import Whitman from "./components/Whitman/Whitman";

import "./styles/styles.scss";

function App() {
  return (
    <div className="cybotrance">
      <Time />
      <ErrorBoundary>
        <Weather />
      </ErrorBoundary>
      <Whitman />
    </div>
  );
}

export default App;
