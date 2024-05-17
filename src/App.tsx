import { Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/home";
import Claim from "./pages/claim";
import WalletModal from "./components/modal/walletModal";
import Renegades from "./pages/renegades";
import LiquifyModal from "./components/modal/liquifyModal";
import ClaimModal from "./components/modal/claimModal";
import SideBar from "./components/header/sideBar";
// import PreSale from "./pages/preSale";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/claim" element={<Claim />} />
        <Route path="/renegades" element={<Renegades />} />
        {/* <Route path="/presale" element={<PreSale />} /> */}
      </Routes>
      <WalletModal />
      <LiquifyModal />
      <ClaimModal />
      <SideBar />
    </div>
  );
}

export default App;
