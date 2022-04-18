import { Routes, Route } from "react-router-dom";
import MainPage from "../routers/page/MainPage.js";
import CreatePage from "../routers/page/CreatePage.js";
import MyAccount from "../routers/page/MyAccount.js";
import Navbar from "./Navbar.js";
import RenderSearch from "../routers/page/RenderSearch";
import Explore from "../routers/page/Explore.js";
import Details from "./Details/Details.js";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path={`/search/:keyword`} element={<RenderSearch />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/myAccounts" element={<MyAccount />} />
        <Route path="/detail/:tid" element={<Details />} />
      </Routes>
    </>
  )
}

export default App;
