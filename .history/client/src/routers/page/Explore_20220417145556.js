import styled from "styled-components";
import { Box, Tabs, Tab, Typography, Container } from "@mui/material";
import { useState } from "react";
import NFTContainer from "../../components/common/NFTContainer";
import { useEffect } from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import { CircularProgress } from "@mui/material";

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
`;

const Explore = (props) => {
  const [value, setValue] = useState("원피스");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  useEffect(() => {
    get();
  }, [value]);

  //!!! 쿼리 수정 요망
  const getNFT = gql`
    query getNFTs($where: [PartialNFTInput!]!) {
      getNFTs(where: $where) {
        ok {
          tid
          name
          description
          url
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
              akey: value,
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
      <TabPanel value={0} index={0}>
        원피스
      </TabPanel>
      <TabPanel value={1} index={1}>
        컬렉션2
      </TabPanel>
      <TabPanel value={2} index={2}>
        컬렉션3
      </TabPanel>
      {loading ? <CircularProgress /> : <NFTContainer data={nftArray} />}
    </ExploreConatainer>
  );
};

export default Explore;
