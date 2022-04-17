import NFTContainer from "../../components/common/NFTContainer";
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
const Explore = (props) => {
  const [value, setValue] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <h2>Explore Collection</h2>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <NFTContainer />
    </>
  );
};

export default Explore;
