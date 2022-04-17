import styled from "styled-components";

import { useEffect, useState } from "react";
import { Avatar, Button } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StyledInput from "./common/StyledInput";

import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import getAccount from "../Controller/getAccount";
import connectWallet from "../Controller/ConnectWallet";
import disConnectWallet from "../Controller/disConnectWallet";
import { logIn, logOut } from "../redux/account/accountSlice";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
<<<<<<< HEAD
const NavbarContainer = styled.nav
width: 1300px;
margin: 0 auto;
display: flex;
justify - content: space - between;
align - items: center;
/* background-color: #dcf5fc; */
/* border: 1px solid black; */
margin - top: 30px;
margin - bottom: 30px;
  img {
  width: 200px;
  /* border: 1px solid black; */
}
  .search - bar {
  width: 600px;
  /* border: 1px solid black; */
  display: flex;
  justify - content: center;
}
  ul {
  width: 400px;
  display: flex;
  justify - content: space - around;
  align - items: center;
  /* border: 1px solid black; */
  display: flex;
  justify - content: space - between;
}
  .log - out {
  cursor: pointer;
}
;
const SearchInput = styled(StyledInput)
width: 500px;
;
const Logo = styled.img.attrs({
  src: "https://media.discordapp.net/attachments/961785188399087616/963737072219349003/logo-removebg-preview_1.png",
})
width: 300px;
height: 75px;
cursor: pointer;
;
=======

const NavbarContainer = styled.nav`
  width: 1300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: #dcf5fc; */
  /* border: 1px solid black; */
  margin-top: 30px;
  margin-bottom: 30px;
  img {
    width: 200px;
    /* border: 1px solid black; */
  }
  .search-bar {
    width: 600px;
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
  }
  ul {
    width: 400px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* border: 1px solid black; */
    display: flex;
    justify-content: space-between;
  }
  .log-out {
    cursor: pointer;
  }
`;

const SearchInput = styled(StyledInput)`
  width: 500px;
`;
const Logo = styled.img.attrs({
  src: "https://media.discordapp.net/attachments/961785188399087616/963737072219349003/logo-removebg-preview_1.png",
})`
  width: 300px;
  height: 75px;
  cursor: pointer;
`;
>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84

//NavBar 반응형 구현!!!!!

const Navbar = (props) => {
  const { setIsSearch, setSearchItem } = props;
  const dispatch = useDispatch();
  const [accounts, setAccounts] = useState("");
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (accounts === "") {
      dispatch(logOut);
    } else {
      dispatch(logIn(accounts));
    }
  }, [accounts]);

  const onSubmit = (data) => {
    if (data.search.length > 1) {
      setIsSearch(true);
      setSearchItem(data.search.trim());
    } else {
      window.prompt("두글자 이상 입력해주세요");
    }
  };
<<<<<<< HEAD
=======

>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84
  return (
    <NavbarContainer>
      <Link to="/">
        <Logo />
      </Link>

      <div className="search-bar">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SearchInput
            type="search"
            placeholder="Search items,collections,and accounts"
            {...register("search")}
          />
          <Button type="submit">검색</Button>
        </form>
      </div>
      <ul>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <li>
          <Link to="/create">Create</Link>
        </li>
        <li>
          {accounts !== "" ? (
            <Link to="/myAccounts">
              <Avatar sx={{ bgcolor: "#caf1fa" }}>L</Avatar>
            </Link>
          ) : (
            <Avatar>N</Avatar>
          )}
        </li>
        <li>
          {accounts === "" ? (
            <AccountBalanceWalletIcon
              color="action"
              fontSize="large"
              onClick={() => connectWallet(getAccount(setAccounts))}
            />
          ) : (
            <div
              className="log-out"
              onClick={() => disConnectWallet(setAccounts)}
            >
              Log Out
            </div>
          )}
        </li>
      </ul>
    </NavbarContainer>
  );
};

export default Navbar;
