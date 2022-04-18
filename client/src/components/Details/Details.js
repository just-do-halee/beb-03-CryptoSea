import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GetNFT } from "../../query";
import api from "../../web3/web3";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTag, faListCheck } from "@fortawesome/free-solid-svg-icons";

import { useForm } from "react-hook-form";

const ImageBox = styled.div`
  display: inline-flex;
  justify-content: space-around;
  width: 500px;
  height: 500px;
  margin-left: 100px;
  margin-top: 50px;
`;

const TextBox = styled.div`
  float: right;
  justify-content: space-around;
  width: 500px;
  height: 250px;
  margin-top: 100px;
  margin-right: 200px;

  h1 {
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .userInfo {
    font-size: 20px;
  }

  .price {
    margin-top: 20px;
    font-weight: bold;
  }

  Button {
    width: 200px;
    height: 50px;
    margin-left: 70px;
    margin-right: 30px;
    margin-top: 50px;
    border-radius: 15px;
  }

  .listings {
    width: 500px;
    height: 70px;
    border-radius: 10px;
    margin-top: 70px;
  }

  .offerbox {
    width: 500px;
    height: 70px;
    border-radius: 10px;
  }

  p {
    display: flex;
    text-align: center;
    padding: 3px 35px 3px 10px;
  }
`;

const Detail = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: 500px;
  height: 300px;
  margin-left: 100px;
  margin-top: 50px;
  padding: 100px;

  .description {
    width: 500px;
    height: 70px;
    border-radius: 10px;
  }

  .properties {
    width: 500px;
    height: 70px;
    border-radius: 10px;
  }

  .details {
    width: 500px;
    height: 70px;
    border-radius: 10px;
  }
`;

const Activity = styled.div`
  width: 1200px;
  height: 70px;
  margin-left: 100px;
  margin-bottom: 50px;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// 데이터 바인딩 구현해야됨,,

const LOADING = "loading...";

const Details = (props) => {
  // modal state
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // navigate 에서 인수로 넘겨준 값이 들어와야함.
  let { tid } = useParams();

  const [owner, setOwner] = useState(LOADING);
  const [creator, setCreator] = useState(LOADING);

  const [isOwner, setIsOwner] = useState(false);

  const [price, setPrice] = useState("0");

  const [expanded, setExpanded] = useState(true);
  const { register, handleSubmit } = useForm();
  const { loading, data: { getNFTs: { ok = [] } = {} } = {} } = useQuery(
    ...QUERY_GetNFT(tid)
  );

  const [firstTrick, setFirstTrick] = useState(false);

  useEffect(() => {
    api.ownerOf(tid).then((address) => {
      api.eth.getAccounts().then(([account]) => {
        if (address === account) {
          setOwner(account);
          setIsOwner(true);
          return;
        }
        api
          .getMarketItemFromTokenId(~~tid)
          .then(({ price = "0", seller } = {}) => {
            if (price !== "0") setPrice(api.parseUnits(price));
            if (typeof seller === "string") {
              setIsOwner(account.toLowerCase() === seller.toLowerCase());
              setOwner(seller);
            }
          }); // get current market item information
      });
    }); // set current token owner
  }, [firstTrick, owner, tid]);

  useEffect(() => {
    setFirstTrick(true);
  }, []);

  //   nft 구매
  const buyNFT = async () => {
    const result = await api.createMarketSale(tid, { value: price });
    console.log(result);
    window.alert("NFT 구입이 완료되었습니다.");
  };
  // 가격 변동
  const onSubmit = (data) => {
    console.log(data.price);
    changePrice(data.price);
    handleClose();
  };

  const changePrice = (price) => {
    if (price !== "0") {
      api.setPrice(~~tid, ~~price, owner).then((res) => {
        if (res) {
          setPrice(price);
        }
      });
      return;
    }
    const priceEth = api.parseUnits(price);
    api
      .createMarketItem(tid, owner, priceEth)
      .then(({ status } = {}) => status && setPrice(price));
  };

  //   api.getMarketItemFromTokenId(tid).then((item) => {
  //     if (Object.keys(item).length === 0) setPrice(0);
  //     console.log(item);
  const {
    name,
    description,
    url,
    transaction: { txhash } = {},
    attributes,
  } = ok[0] || {};

  if (txhash) {
    api.eth
      .getTransactionReceipt("0x" + txhash)
      .then(({ from = LOADING } = {}) => setCreator(from));
  }

  return loading ? (
    <></>
  ) : (
    <>
      <ImageBox>
        <div className="images">
          <img src={url} alt={name} />
        </div>
      </ImageBox>
      <TextBox>
        <div className="detailText">
          <h1>{name}</h1>
          <p className="userInfo">Owned by {owner}</p>
          <p className="price">Price{price}</p>
          {isOwner ? (
            <>
              <Button varitant="contained" onClick={handleOpen}>
                Set Price
              </Button>
              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    가격을 입력해주세요.
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        type="text"
                        placeholder="가격정보"
                        {...register("price")}
                      />
                      <Button type="submit">변경</Button>
                    </form>
                  </Typography>
                </Box>
              </Modal>
            </>
          ) : (
            <Button variant="contained" onClick={() => buyNFT()}>
              Buy Now
            </Button>
          )}

          <Accordion>
            <div className="listings">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {/* <FontAwesomeIcon icon={faTag} className="tag" /> */}
                <Typography>Listings</Typography>
              </AccordionSummary>
            </div>
            <AccordionDetails>
              <Typography>Price</Typography>
              <Typography>USD Price</Typography>
              <Typography>Expiration</Typography>
              <Typography>From</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <div className="offerbox">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                {/* <FontAwesomeIcon icon={faListCheck} className="offer" /> */}
                <Typography>Offer</Typography>
              </AccordionSummary>
            </div>
            <AccordionDetails>
              <Typography>test</Typography>
            </AccordionDetails>
          </Accordion>
        </div>
      </TextBox>
      <Detail>
        <Accordion expanded={expanded}>
          <div className="description">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              {/* <FontAwesomeIcon icon="fa-solid fa-align-left" /> */}
              <Typography>Description</Typography>
            </AccordionSummary>
          </div>
          <AccordionDetails>
            <Typography>{description}</Typography>
            <Typography>Created by {creator}</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded}>
          <div className="properties">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <Typography>Properties</Typography>
            </AccordionSummary>
          </div>
          <AccordionDetails>
            {attributes.map(({ akey, avalue }, idx) => {
              return <Typography key={idx}>{`${akey}: ${avalue}`}</Typography>;
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded}>
          <div className="details">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={() => {
                setExpanded(!expanded);
              }}
            >
              <Typography>Details</Typography>
            </AccordionSummary>
          </div>
          <AccordionDetails>
            <Typography>{`token id: ${tid}`}</Typography>
          </AccordionDetails>
        </Accordion>
      </Detail>
      <Activity>
        <Accordion>
          <div className="item-activity">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Item Activity</Typography>
            </AccordionSummary>
          </div>
          <AccordionDetails>
            <Typography>test</Typography>
          </AccordionDetails>
        </Accordion>
      </Activity>
    </>
  );
};

export default Details;
