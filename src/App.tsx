import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/home";
import Claim from "./pages/claim";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/claim" element={<Claim />} />
      </Routes>
    </div>
  );
}

export default App;
