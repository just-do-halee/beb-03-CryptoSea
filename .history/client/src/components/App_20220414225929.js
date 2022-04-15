import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "../routers/page/MainPage.js";
import CreatePage from "../routers/page/CreatePage.js";
import MyAccount from "../routers/page/MyAccount.js";
import Navbar from "./Navbar.js";
const changeChainId = async () => {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  // const handleChainChanged = (chainId) => {
  //   // window.location.reload();
  // };
  if (chainId !== "0x3") {
    window.alert("롭스텐 네트워크로 바꿔주세요.");
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });
  }
};

function App() {
  useEffect(() => {
    changeChainId();
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/myAccounts" element={<MyAccount />} />
      </Routes>
    </>
  );
}

export default App;
