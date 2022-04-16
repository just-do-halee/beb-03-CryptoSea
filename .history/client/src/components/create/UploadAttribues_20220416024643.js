import { incrementAttributes } from "../../redux/createNFT/nftSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem, Button } from "@mui/material";
import styled from "styled-components";
import CreateContaier from "../common/CreateContainer";
import FlexContainer from "../common/FlexContainer";
import StyledInput from "../common/StyledInput";

const StyleSelect = styled(Select)`
  width: 350px;
  height: 50px;
  border-radius: 15px;

  margin-right: 20px;
  border: 0.3px solid #caf1fa;
`;
const UploadAttributes = () => {
  const dispatch = useDispatch();

  const attributes = useSelector((state) => state.createNFT.attributes);
  //
  return (
    <CreateContaier>
      <h3>Attributes</h3>
      <p>Add a property to your nft.</p>
      {attributes.map((value, index) => {
        return (
          <div key={index}>
            <FlexContainer>
              <StyleSelect
                label="Type *"
                value={"Type"}
                onChange={(e) =>
                  dispatch(
                    incrementAttributes({ atype: e.target.value, index })
                  )
                }
              >
                <MenuItem value={"Plain"}>Plain</MenuItem>
                {/* <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </StyleSelect>

              <StyledInput
                placeholder="Key"
                onChange={(e) =>
                  dispatch(incrementAttributes({ akey: e.target.value, index }))
                }
              />
              <StyledInput
                placeholder="Value"
                onChange={(e) =>
                  dispatch(
                    incrementAttributes({ avalue: e.target.value, index })
                  )
                }
              />
            </FlexContainer>
          </div>
        );
      })}

      <Button onClick={() => dispatch(incrementAttributes("plus"))}>
        AddMore
      </Button>
    </CreateContaier>
  );
};

export default UploadAttributes;
