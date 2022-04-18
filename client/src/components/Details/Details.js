import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GetNFT } from "../../query";
import api from "../../web3/web3";

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

// 데이터 바인딩 구현해야됨,,

const LOADING = "loading...";

const Details = (props) => {
  // navigate 에서 인수로 넘겨준 값이 들어와야함.
  let { tid } = useParams();

  const [owner, setOwner] = useState(LOADING);
  const [creator, setCreator] = useState(LOADING);

  const [expanded, setExpanded] = useState(true);

  const { loading, data: { getNFTs: { ok = [] } = {} } = {} } = useQuery(
    ...QUERY_GetNFT(tid)
  );

  api.ownerOf(tid).then(setOwner);

  const {
    name,
    description,
    url,
    transaction: { txhash } = {},
    attributes,
  } = ok[0] || {};

  const price = 0;
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
          <Button variant="contained">
            <Link to="/">Buy now</Link> {/* 경로 설정 연동 필요 */}
          </Button>
          <Accordion>
            <div className="listings">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
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
