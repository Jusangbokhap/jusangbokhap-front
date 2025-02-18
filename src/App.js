import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/hero/Hero";
import Accommodations from './components/accommodations/Accommodations';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/accommodations" element={<Accommodations />} />
      </Routes>
    </Router>
  );
}

export default App;
