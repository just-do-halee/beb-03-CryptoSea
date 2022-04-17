import styled from "styled-components";
import { Box, Tabs, Tab, Typography, Container } from "@mui/material";
import { useState } from "react";
import NFTContainer from "../../components/common/NFTContainer";
import { useEffect } from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
<<<<<<< HEAD
import { CircularProgress } from "@mui/material";
=======
import { CircularProgress, Button } from "@mui/material";
>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84

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
    width: 300px;
    margin: 0 auto;
  }
  .box {
    /* border: 1px solid black; */
    display: flex;
    justify-content: center;
    align-items: center;
  }
<<<<<<< HEAD
`;

const Explore = (props) => {
  const [value, setValue] = useState("원피스");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    get();
  }, [value]);
=======
  ul {
    display: flex;
  }
`;

const Explore = (props) => {
  const [getData, setGetData] = useState("원피스");
  const handleClick = (e) => {
    console.log(e.target.value);
    setGetData(e.target.value);
  };
  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    get();
  }, [getData]);
>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84

  //!!! 쿼리 수정 요망
  const getNFT = gql`
    query getNFTs($where: [PartialNFTInput!]!) {
      getNFTs(where: $where) {
        ok {
          tid
          name
          description
          url
<<<<<<< HEAD
=======
          transaction {
            txhash
          }
>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84
        }
        error
      }
    }
  `;
<<<<<<< HEAD
  const [get, { loading, data }] = useLazyQuery(getNFT, {
=======
  const [get, { loading, data, error }] = useLazyQuery(getNFT, {
>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84
    variables: {
      where: [
        {
          attributes: [
            {
<<<<<<< HEAD
              akey: value,
=======
              atype: getData,
>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84
            },
          ],
        },
      ],
    },
  });
<<<<<<< HEAD
  console.log(data);
  let nftArray;
  if (data) {
    if (data.getNFTs.ok) {
      console.log(data.getNFTs.ok);
      nftArray = data.getNFTs.ok;
    }
  }

  
=======

  let nftArray;
  if (data) {
    console.log(data);
    // if (data.getNFTs.ok) {
    //   console.log(data.getNFTs.ok);
    //   nftArray = data.getNFTs.ok;
    // }
  }

>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84
  return (
    <ExploreConatainer>
      <h1>Explore Collection</h1>
      <Box className="box" sx={{ borderBottom: 1, borderColor: "divider" }}>
<<<<<<< HEAD
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      <TabPanel value="원피스" index={0}>
        원피스
      </TabPanel>
      <TabPanel value="컬렉션2" index={1}>
        컬렉션2
      </TabPanel>
      <TabPanel value="컬렉션3" index={2}>
        컬렉션3
      </TabPanel>
      {loading ? <NFTContainer data={nftArray} /> : <CircularProgress />}
=======
        <ul>
          <li>
            <Button value="원피스" onClick={handleClick}>
              원피스
            </Button>
          </li>
          <li>
            <Button value="나루토" onClick={handleClick}>
              나루토
            </Button>
          </li>
          <li>
            <Button value="블리치">원피스</Button>
          </li>
        </ul>
      </Box>

      {loading ? <CircularProgress /> : <NFTContainer data={nftArray} />}
>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84
    </ExploreConatainer>
  );
};

export default Explore;
