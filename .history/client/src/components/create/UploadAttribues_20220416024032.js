import { Button } from "@mui/material";
import { incrementAttributes } from "../../redux/createNFT/nftSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem } from "@mui/material";

import CreateContaier from "../common/CreateContainer";
import FlexContainer from "../common/FlexContainer";
import StyledInput from "../common/StyledInput";

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
              <Select
                label="Type"
                onChange={(e) =>
                  dispatch(
                    incrementAttributes({ atype: e.target.value, index })
                  )
                }
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>

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
