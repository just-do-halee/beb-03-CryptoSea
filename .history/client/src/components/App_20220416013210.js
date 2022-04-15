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
      nftArray = data.searchNFTs.ok;
    }
    // setIsSearch(false);
    // setIsSearch(false);
  }
  return (
    <>
      <Navbar setIsSearch={setIsSearch} setSearchItem={setSearchItem} />
      {/* isSearch 가 true 어떤 컴포넌트를 랜더링해줘야함. */}
      {isSearch ? (
        loading ? (
          <div>loading...</div>
        ) : (
          <RenderSearch data={nftArray} />
        )
      ) : (
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/myAccounts" element={<MyAccount />} />
        </Routes>
      )}
    </>
  );
}

export default App;
