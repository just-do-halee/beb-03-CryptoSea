import styled from "styled-components";

import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StyledInput from "../common/StyledInput";

import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

import getAccount from "../../Controller/getAccount";
import connectWallet from "../../Controller/ConnectWallet";

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

//NavBar 반응형 구현!!!!!

const Navbar = () => {
  const dispatch = useDispatch();
  const [accounts, setAccounts] = useState("");
  useEffect(() => {
    setAccounts(getAccount);
  }, []);

  return (
    <NavbarContainer>
      <Link to="/">
        <Logo />
      </Link>

      <div className="search-bar">
        <form action="">
          <SearchInput
            type="search"
            placeholder="Search items,collections,and accounts"
          />
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
          {accounts !== "" ? (
            <AccountBalanceWalletIcon
              color="action"
              fontSize="large"
              onClick={() => connectWallet(dispatch)}
            />
          ) : (
            <div>Log Out</div>
          )}
        </li>
      </ul>
    </NavbarContainer>
  );
};

export default Navbar;
