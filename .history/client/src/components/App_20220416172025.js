import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";

import gql from "graphql-tag";
import MainPage from "../routers/page/MainPage.js";
import CreatePage from "../routers/page/CreatePage.js";
import MyAccount from "../routers/page/MyAccount.js";
import Navbar from "./Navbar.js";
import checkRopsten from "../Controller/checkRopsten";
import RenderSearch from "../routers/page/RenderSearch";
import { CircularProgress } from "@mui/material";
import Explore from "../routers/page/Explore.js";

function App() {
  const [isSearch, setIsSearch] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    checkRopsten();
  }, []);

  useEffect(() => {
    search();
  }, [searchItem]);

  const searchNFT = gql`
    query searchNFTs($keyword: String!) {
      searchNFTs(keyword: $keyword) {
        ok {
          tid
          name
          description
          url
        }
        error
      }
    }
  `;

  const [search, { loading, data }] = useLazyQuery(searchNFT, {
    variables: {
      keyword: searchItem,
    },
  });
  let nftArray;
  console.log(data);
  if (data) {
    if (data.searchNFTs) {
      console.log(data.searchNFTs.ok);
      nftArray = data.searchNFTs.ok;
    }
  }
  return (
    <>
      <Navbar setIsSearch={setIsSearch} setSearchItem={setSearchItem} />
      {/* isSearch 가 true 어떤 컴포넌트를 랜더링해줘야함. */}
      {isSearch ? (
        loading ? (
          <CircularProgress />
        ) : (
          <RenderSearch data={nftArray} />
        )
      ) : (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/myAccounts" element={<MyAccount />} />
        </Routes>
      )}
    </>
  );
}

export default App;
