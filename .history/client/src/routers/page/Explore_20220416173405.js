import styled from "styled-components";
import { Box, Tabs, Tab, Typography, Container } from "@mui/material";
import { useState } from "react";
import NFTContainer from "../../components/common/NFTContainer";
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
  const [value, setValue] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
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
      <TabPanel value={value} index={0}>
        ???
      </TabPanel>
      <TabPanel value={value} index={1}>
        ???
      </TabPanel>
      <TabPanel value={value} index={2}>
        ???
      </TabPanel>
      <NFTContainer />
    </ExploreConatainer>
  );
};

export default Explore;
