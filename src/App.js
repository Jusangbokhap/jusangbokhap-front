import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/hero/Hero";
import Accommodations from './components/accommodations/Accommodations';
import Accommodation from './components/accommodations/Accommodation';

import MapView from "./components/map/MapView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/accommodations" element={<Accommodations />} />
        <Route path="/accommodation/:id" element={<Accommodation />} />
        <Route path="/map" element={<MapView />} />
      </Routes>
    </Router>
  );
}

export default App;
