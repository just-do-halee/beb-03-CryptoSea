import styled from "styled-components";
import { Avatar, Box, Typography, Modal, Button } from "@mui/material";
import CreateContaier from "../../components/common/CreateContainer";

import { useEffect, useState } from "react";
import NFT from "../../components/common/NFT.js";

import FlexContainer from "../../components/common/FlexContainer";
import getAccount from "../../Controller/getAccount";
import { useSelector } from "react-redux";

const MyAccountContainer = styled(CreateContaier)`
  width: 100%;
  .top-background {
    width: 100%;
    height: 20vh;
    background-color: #4fb4fa;
    position: relative;

    .avatar {
      width: 100px;
      height: 100px;
      position: absolute;
      bottom: -50px;
      left: 50%;
      margin-left: -50px;
    }
  }
  .bottom-background {
    width: 100%;
    height: 20vh;
    background-color: white;
    border-bottom: 0.5px solid #d0d0d0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      width: 300px;
      display: flex;
      justify-content: center;
    }
    .accounts {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 30px;
        height: 30px;
      }
    }
  }
`;
const NFTContainer = styled(FlexContainer)`
  width: 80%;
  margin: 0 auto;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MyAccount = () => {
  const [account, setAccount] = useState();
  const accounts = useSelector((state) => state.accounts.accounts);
  useEffect(() => {
    getAccount(setAccount);
  }, []);

  console.log(account);
  return (
    <MyAccountContainer>
      <div className="top-background">
        <Avatar className="avatar" sx={{ bgcolor: "#caf1fa" }}>
          L
        </Avatar>
      </div>
      <div className="bottom-background">
        <h3>username</h3>
        <div className="accounts">
          <img
            src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
            alt=""
          />
          <div>{account}</div>
        </div>
      </div>
      {/* useEffect 로 계정에 있는 데이터들 받아와서 <NFT랜더링>해야함 */}
      <NFTContainer>
        <NFT
          name={"바꿔야할 네임"}
          image={"데이터 이미지"}
          price={"데이터 가격"}
        ></NFT>
        <NFT
          name={"바꿔야할 네임"}
          image={"데이터 이미지"}
          price={"데이터 가격"}
        ></NFT>
        <NFT
          name={"바꿔야할 네임"}
          image={"데이터 이미지"}
          price={"데이터 가격"}
        ></NFT>
        <NFT
          name={"바꿔야할 네임"}
          image={"데이터 이미지"}
          price={"데이터 가격"}
        ></NFT>
      </NFTContainer>
    </MyAccountContainer>
  );
};

export default MyAccount;
