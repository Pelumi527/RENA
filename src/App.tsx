import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/home";
import Claim from "./pages/claim";
import WalletModal from "./components/modal/walletModal";
import Renegades from "./pages/renegades";
import ItemModal from "./components/modal/itemModal";
import ClaimModal from "./components/modal/claimModal";
import SideBar from "./components/header/sideBar";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/claim" element={<Claim />} />
        <Route path="/renegades" element={<Renegades />} />
      </Routes>
      <WalletModal />
      <ItemModal />
      <ClaimModal />
      <SideBar />
    </div>
  );
}

export default App;
