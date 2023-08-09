import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import SearchResults from "./component/SearchResults";
import ScrollToTop from "./component/ScrollToTop";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Onboarding" element={<Onboarding />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/DetailPage" element={<DetailPage />} />
          <Route path="/SearchResults" element={<SearchResults />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
