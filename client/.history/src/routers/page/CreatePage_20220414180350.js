import styled from "styled-components";
import { useSelector } from "react-redux";
import { create } from "ipfs-http-client";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import UploadDescription from "../../components/create/UploadDescription.js";
import UploadImg from "../../components/create/UploadImg.js";
import UploadName from "../../components/create/UploadName.js";

import UploadAttributes from "../../components/create/UploadAttribues.js";
import { web3 } from "../../web3/web3";
import getAccount from "../../Controller/getAccount.js";

// 각 컴포넌트 안에서 받아온 데이터를 redux 로 상태저장하고 그걸 보내줌.

const Container = styled.section`
  font-size: 14.5px;
  color: rgb(53, 56, 64);
  box-sizing: border-box;
  width: 100%;
  height: 2000px; //나중에 수정해줘야해
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid black; */
  h1 {
    margin-bottom: 16px;
    font-weight: 800;
    font-size: 40px;
    letter-spacing: 0px;
    color: rgb(4, 17, 29);
  }
  p {
    font-weight: 500;
    font-size: 12px;
    color: rgb(112, 122, 131);
    span {
      color: red;
    }
  }
`;

const CreateButton = styled(Button)`
  width: 200px;
  height: 50px;
  border-radius: 20px;
`;

const CreatePage = () => {
  const [account, setAccount] = useState();
  useEffect(() => {
    getAccount(setAccount);
  }, []);
  const nftData = useSelector((state) => state.createNFT);

  console.log(nftData);
  const ipfsTransferImage = async () => {
    const { image } = nftData;
    //image = Buffer
    const client = create("https://ipfs.infura.io:5001/api/v0");
    try {
      const created = await client.add(image);
      console.log(created);
      const cid = created.cid._baseCache.get("z");
      console.log(cid);
      ipfsTransferMetaData(cid);
    } catch (error) {
      console.log(error.message);
    }
  };

  const ipfsTransferMetaData = async (cid) => {
    const { name, description, attributes } = nftData;
    const metaData = {
      ctype: "ipfs",
      cid,
      name,
      description,
      attributes,
    };
    try {
      const client = create("https://ipfs.infura.io:5001/api/v0");
      const created = await client.add(JSON.stringify(metaData));
      console.log(created);
      const cid = created.cid._baseCache.get("z");
      console.log(cid);
    } catch (err) {
      console.log(err);
    }
  };

  // const sendTransaction = async (metaCid, ContractAddress) => {
  //   console.log(myWalletAdress);
  //   try {
  //     web3.eth.sendTransaction({
  //       from: ContractAddress,
  //       to: myWalletAdress,
  //       value:,
  //       data:
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <Container>
      <h1>Create New Item</h1>
      <p>
        <span>*</span> Required fields
      </p>
      <UploadImg />
      <UploadName />
      {/* <UploadLink /> */}
      <UploadDescription />
      <UploadAttributes />
      <CreateButton variant="contained" onClick={ipfsTransferImage}>
        Create
      </CreateButton>
    </Container>
  );
};

export default CreatePage;
