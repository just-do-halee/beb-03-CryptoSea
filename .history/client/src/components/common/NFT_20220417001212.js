import FlexContainer from "./FlexContainer";
import styled from "styled-components";
import { Box, Typography, Modal, Button } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../web3/web3";

const NFTContainer = styled(FlexContainer)`
  flex-direction: column;
  /* border: 0.3px solid black; */
  border-radius: 15px;
  border: 0.3px solid #eae7e7;
  margin-bottom: 70px;
`;
const ImageBox = styled.div`
  font-size: 14.5px;
  writing-mode: horizontal-tb;
  color: rgb(32, 129, 226);
  pointer-events: initial;
  box-sizing: border-box;
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  max-height: 100%;
  width: 300px;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  height: 300px;
  width: 300px;

  img {
    font-family: Poppins, sans-serif;
    line-height: 1.5;
    font-size: 14.5px;
    writing-mode: horizontal-tb;
    color: rgb(32, 129, 226);
    pointer-events: initial;
    box-sizing: border-box;
    transition: opacity 400ms ease 0s;
    opacity: 1;

    border-radius: 0px;
  }
`;

const ContentBox = styled.div`
  writing-mode: horizontal-tb;
  color: rgb(32, 129, 226);
  pointer-events: initial;
  box-sizing: border-box;
  width: 100%;
  height: 75px;
  display: flex;

  justify-content: space-around;
  align-items: center;
  /* border: 1px solid black; */
  .name {
    /* border: 1px solid black; */
    width: 150px;
    font-size: 1.2rem;
  }
  .price {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    /* border: 1px solid black; */
    .price-detail {
      width: 130px;
      /* border: 1px solid black; */
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    p {
      font-family: Poppins, sans-serif;
      line-height: 2;
      font-size: 1.2rem;
      text-align: center;
      font-weight: 400;
      /* font-size: 12px; */
      color: rgb(112, 122, 131);
    }
    img {
      font-family: Poppins, sans-serif;
      writing-mode: horizontal-tb;
      pointer-events: initial;
      color: rgb(53, 56, 64);
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
    }
    span {
      font-size: 1.1rem;
      color: #999;
    }
  }
`;

const FooterBox = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: Poppins, sans-serif;
  line-height: 1.5;
  font-size: 1.3rem;
  color: rgb(32, 129, 226);
  font-weight: 400;
  padding: 12px;
  height: 42px;
  width: 100%;
  border-top: 0.1px solid #eae7e7;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  div {
    cursor: pointer;
    :hover {
      opacity: 0.5;
    }
  }
  .description {
    color: #999;
  }
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #eae7e7",
  boxShadow: 24,
  p: 4,
};

const NFT = (props) => {
  const { image, name, description, buy, edit, tid, transaction } = props;
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(transaction);
  const changePrice = () => {
    // 가격정보 변경
  };

  const readPrice = async (transaction) => {
    const result = await api.getTransactionReceipt(transaction);
    const price = await api.decoded(result.logs[2].data, "price").price;
    return price;
  };
  useEffect(() => {
    setPrice(readPrice(transaction));
  }, []);

  return (
    <NFTContainer>
      <ImageBox>
        <img src={image} alt="이미지" />
      </ImageBox>
      <ContentBox>
        <div className="name">{name}</div>

        <div className="price">
          <p>Price</p>
          <div className="price-detail">
            <img
              src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
              alt=""
            />
            <span onClick={edit && changePrice}>{price}</span>
            {/* //가격바꿀수있게 해줘야함. */}
          </div>
        </div>
      </ContentBox>
      <FooterBox>
        {buy ? (
          <>
            {" "}
            <div onClick={handleOpen}>Buy Now</div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Please switch to Ethereum network
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  In order to trade items, please switch to Ethereum network
                  within your MetaMask wallet.
                </Typography>
                <Typography>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button>Switch network</Button>
                  {/* network 연결 */}
                </Typography>
              </Box>
            </Modal>
          </>
        ) : (
          <div className="description">{description}</div>
        )}
      </FooterBox>
    </NFTContainer>
  );
};

export default NFT;
