import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import DashboardLayout from "./components/DashboardLayout";
import Search from "./components/search/Search";
import Searchprint from "./components/search/Searchprint";
import Diplay from "./components/display/Diplay";
import Diplayprint from "./components/display/Diplayprint";
import Print from "./components/print/Print";
import JustPrint from "./components/print/JustPrint";
import Report from "./components/report/Report";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<DashboardLayout />}>
          <Route path="/assemblynah/search" element={<Search />} />
          <Route path="/assemblynah/searchprint" element={<Searchprint />} />
          <Route path="/assemblynah/report" element={<Report />} />
          <Route path="/assemblynah/display" element={<Diplay />} />
          <Route path="/assemblynah/displayprint" element={<Diplayprint />} />
          <Route path="/assemblynah/print" element={<Print />} />
          <Route path="/assemblynah/justprint" element={<JustPrint />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
