import styled from "styled-components";
import { Box, Tabs, Tab, Typography, Container } from "@mui/material";
import { useState } from "react";
import NFTContainer from "../../components/common/NFTContainer";
import { useEffect } from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { CircularProgress, Button } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const ExploreConatainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    width: 300px;
    margin: 0 auto;
  }
  .box {
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul {
    display: flex;
    justify-content: center;
    margin-right: 40px;
  }

  li {
    padding: 20px;
  }
`;

const Explore = (props) => {
  const [getData, setGetData] = useState("ONEPIECE");
  const handleClick = (e) => {
    // console.log(e.target.value);
    setGetData(e.target.value);
  };
  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    get();
  }, [getData]);

  //!!! 쿼리 수정 요망
  const getNFT = gql`
    query getNFTs($where: [PartialNFTInput!]!) {
      getNFTs(where: $where) {
        ok {
          tid
          name
          description
          url
          transaction {
            txhash
          }
        }
        error
      }
    }
  `;

  const [get, { loading, data, error }] = useLazyQuery(getNFT, {
    variables: {
      where: [
        {
          attributes: [
            {
              atype: getData,
            },
          ],
        },
      ],
    },
  });

  let nftArray;
  if (data) {
    // console.log(data);
    if (data.getNFTs.ok) {
      // console.log(data.getNFTs.ok);
      nftArray = data.getNFTs.ok;
    }
  }

  return (
    <ExploreConatainer>
      <h1>Explore Category</h1>
      <Box className="box" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ul>
          <li>
            <Button value="art" onClick={handleClick}>
              Art
            </Button>
          </li>
          <li>
            <Button value="photography" onClick={handleClick}>
              PhotoGrapy
            </Button>
          </li>
          <li>
            <Button value="collectibles">Collectibles</Button>
          </li>
          <li>
            <Button value="Sports">Sports</Button>
          </li>
        </ul>
      </Box>

      {loading ? <CircularProgress /> : <NFTContainer data={nftArray} />}
    </ExploreConatainer>
  );
};

export default Explore;
