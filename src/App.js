// import './components/GrainMayhem/grain-mayhem.js'
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Time from "./components/Time/Time";
import Weather from "./components/Weather/Weather";
import Twitter from "./components/Twitter/Twitter";

import "./App.scss";

function App() {
  return (
    <div className="cybotrance">
      <Time />
      <ErrorBoundary>
        <Weather />
      </ErrorBoundary>
      <Twitter />
    </div>
  );
}

export default App;
