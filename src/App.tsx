import { Route, Routes } from "react-router-dom";


import "./App.css";
import Home from "./pages/home";
import Claim from "./pages/claim";
import WalletModal from "./components/modal/walletModal";
import Renegades from "./pages/renegades";
import ClaimModal from "./components/modal/claimModal";
import SideBar from "./components/header/sideBar";
import Staking from "./pages/staking";

import { QueryClientProvider, QueryClient } from "react-query";
// import PreSale from "./pages/preSale";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/renegades" element={<Renegades />} />
          <Route path="/staking" element={<Staking />} />
        </Routes>
        <WalletModal />
        <ClaimModal />
        <SideBar />
      </div>
    </QueryClientProvider>
  );
}

export default App;
