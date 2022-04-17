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
  }
`;

const Explore = (props) => {
  const [getData, setGetData] = useState("원피스");
  const handleChange = (e) => {
    console.log(e.target.value);
    // if (e.target.value === 0) {
    //   result = "원피스";
    // } else if (e.target.value === 1) {
    //   result = "??";
    // } else {
    //   result = "????";
    // }
    // setGetData(result);
  };
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
          transaction
        }
        error
      }
    }
  `;
  const [get, { loading, data }] = useLazyQuery(getNFT, {
    variables: {
      where: [
        {
          attributes: [
            {
              akey: getData,
            },
          ],
        },
      ],
    },
  });
  console.log(data);
  let nftArray;
  if (data) {
    if (data.getNFTs.ok) {
      console.log(data.getNFTs.ok);
      nftArray = data.getNFTs.ok;
    }
  }

  return (
    <ExploreConatainer>
      <h1>Explore Collection</h1>
      <Box className="box" sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ul>
          <li>
            <Button>원피스</Button>
          </li>
          <li>
            <Button>원피스</Button>
          </li>
          <li>
            <Button>원피스</Button>
          </li>
        </ul>
      </Box>
      {/* <TabPanel value={0} index={0}>
        {loading ? <CircularProgress /> : <NFTContainer data={nftArray} />}
      </TabPanel>
      <TabPanel value={1} index={1}>
        {loading ? <CircularProgress /> : <NFTContainer data={nftArray} />}
      </TabPanel>
      <TabPanel value={2} index={2}>
        {loading ? <CircularProgress /> : <NFTContainer data={nftArray} />}
      </TabPanel> */}
    </ExploreConatainer>
  );
};

export default Explore;
