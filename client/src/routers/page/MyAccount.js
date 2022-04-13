import styled from "styled-components";
import { Avatar, Box, Typography, Modal, Button } from "@mui/material";
import CreateContaier from "../../components/common/CreateContainer";

import { useEffect, useState } from "react";
import NFT from "../../components/common/NFT.js";

import FlexContainer from "../../components/common/FlexContainer";

const MyAccountContainer = styled(CreateContaier)`
  width: 100%;
  .top-background {
    width: 100%;
    height: 20vh;
    background-color: #4fb4fa;
    position: relative;

    /* border: 1px solid black; */
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
      border: 1px solid black;
      width: 300px;
      display: flex;
      justify-content: center;
    }
    .accounts {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid black;

      img {
        width: 30px;
        height: 30px;
      }
    }
  }
  /* border: 1px solid black; */
`;
const NFTContainer = styled(FlexContainer)`
  /* border: 1px solid black; */
  width: 80%;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const MyAccount = () => {
  const [account, setAccount] = useState();
  useEffect(async () => {
    setAccount(await getAccount());
  }, []);

  const getAccount = async () => {
    try {
      const account = await window.ethereum.request({ method: "eth_accounts" });
      console.log(account);
      return account;
    } catch (err) {
      console.log(err);
    }
  };

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
