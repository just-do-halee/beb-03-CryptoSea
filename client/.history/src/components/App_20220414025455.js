import React from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "../routers/page/MainPage.js";
import CreatePage from "../routers/page/CreatePage.js";
import MyAccount from "../routers/page/MyAccount.js";
import Navbar from "./mainPage/Navbar.js";

function App() {
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
