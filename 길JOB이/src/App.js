import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import SearchResults from "./component/SearchResults";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Onboarding" element={<Onboarding />} />
          <Route path="/SearchResults" element={<SearchResults />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
