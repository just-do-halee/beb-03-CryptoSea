import styled from "styled-components";
import { Avatar, Box, Typography, Modal, Button } from "@mui/material";
import CreateContaier from "../../components/common/CreateContainer";

import { useEffect } from "react";
import NFT from "../../components/common/NFTContainer";

const MyAccountContainer = styled(CreateContaier)`
  width: 100%;
  /* border: 1px solid black; */
`;

const MyAccount = () => {
  useEffect(() => {}, []);
  return (
    <MyAccountContainer>
      <div>배경 회색</div>
      <Avatar sx={{ bgcolor: "#caf1fa" }}>L</Avatar>
      <div>배경 흰색 </div>
      {/* useEffect 로 계정에 있는 데이터들 받아와서 <NFT랜더링>해야함 */}
      {/* <NFT name={"바꿔야할 네임"} image={"데이터 이미지"} price={"데이터 가격"}></NFT> */}
    </MyAccountContainer>
  );
};

export default MyAccount;
