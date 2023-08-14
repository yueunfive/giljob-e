import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import SearchResults from "./component/SearchResults";
import ScrollToTop from "./component/ScrollToTop";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/Onboarding" element={<Onboarding />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/DetailPage" element={<DetailPage />} />
          <Route path="/SearchResults" element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
