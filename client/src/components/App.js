import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../routers/page/MainPage.js';
import CreatePage from '../routers/page/CreatePage.js';
function App() {
  return (
    <>
      {/* navbar */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </>
  );
}

export default App;
