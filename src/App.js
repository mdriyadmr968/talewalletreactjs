import "./App.css";
import WalletUI from "./components/WalletUI";
import LoginUi from "./components/LoginUi";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [tale_wallet_address, setTaleWalletAddress] = useState(null);

  useEffect(() => {
    var authToken = localStorage.getItem("authToken");
    var tale_wallet_address = localStorage.getItem("tale_wallet_address");
    setTaleWalletAddress(tale_wallet_address);
  }, []);

  return (
    <div>
      <Navbar />
      {tale_wallet_address ? (
        <WalletUI bgColor={"white"} textColor={"black"} />
      ) : (
        <LoginUi />
      )}
    </div>
  );
}
export default App;
