
import { BrowserRouter, Routes, Route ,useLocation } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Search from './components/Search'
import Print from './components/print/Print'
import JustPrint from './components/print/JustPrint'
import Searchprint from './components/Searchprint'
import Report from './components/report/Report'
import Diplay from './components/display/Diplay'
import Header from './components/header/Header'
import Diplayprint from './components/display/Diplayprint'




const App = () => {
  const location = useLocation();

  // List of paths where the Header should be hidden
  const hideHeaderPaths = ["/assemblynah/"];
  const menuPath=["/assemblynah/menu"]

  // Check if the current path matches any in the hideHeaderPaths array
  const isHeaderHidden = hideHeaderPaths.some((path) => location.pathname === path)||menuPath .some((path) => location.pathname === path);

  return (
      <>
          {/* Conditionally render the Header */}
          {!isHeaderHidden && <Header />}

          <Routes>
              <Route path="assemblynah" element={<Login />} />
                        <Route path="assemblynah/search" element={<Search />} />
              <Route path="assemblynah/searchprint" element={<Searchprint />} />
              <Route path="assemblynah/Print" element={<Print />} />
              <Route path="assemblynah/justprint" element={<JustPrint />} />
              <Route path="assemblynah/report" element={<Report />} />
              <Route path="assemblynah/display" element={<Diplay />} />
              <Route path="assemblynah/displayprint" element={<Diplayprint />} />
          </Routes>
      </>
  );
};

const Root = () => (
  <BrowserRouter>
      <App />
  </BrowserRouter>
);

export default Root;