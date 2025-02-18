import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/hero/Hero";
import MapView from "./components/map/MapView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/map" element={<MapView />} />
      </Routes>
    </Router>
  );
}

export default App;
