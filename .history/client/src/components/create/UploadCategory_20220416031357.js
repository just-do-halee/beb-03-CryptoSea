import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Select, MenuItem, Button } from "@mui/material";
import CreateContaier from "../common/CreateContainer.js";
import { useSelector } from "react-redux";
import { incrementAttributes } from "../../redux/createNFT/nftSlice.js";
import StyledInput from "../common/StyledInput.js";
import FlexContainer from "../common/FlexContainer.js";

const StyleSelect = styled(Select)`
  width: 350px;
  height: 50px;
  border-radius: 15px;

  margin-right: 20px;
  border: 0.3px solid #caf1fa;
`;
const UploadCategory = () => {
  const dispatch = useDispatch();
  const attributes = useSelector((state) => state.createNFT.attributes);
  return (
    <CreateContaier>
      <h3>Category</h3>
      <p>
        OpenSea will include a Category on this item's detail page, so that
        users can click to learn more about it. You are welcome to link to your
        own webpage with more details.
      </p>
      <FlexContainer>
        <StyleSelect
          label="Category *"
          value="Category"
          onChange={(e) =>
            dispatch(incrementAttributes({ atype: e.target.value }))
          }
        >
          <MenuItem value={"Collection"}>Collection</MenuItem>
          <MenuItem value={"Category"}>Category</MenuItem>
        </StyleSelect>
        <StyledInput
          onChane={(e) =>
            dispatch(incrementAttributes({ akey: e.target.value }))
          }
        />
      </FlexContainer>
    </CreateContaier>
  );
};

export default UploadCategory;
