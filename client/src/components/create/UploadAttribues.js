import { incrementAttributes } from "../../redux/createNFT/nftSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem, Button, InputLabel } from "@mui/material";
import styled from "styled-components";
import CreateContaier from "../common/CreateContainer";
import FlexContainer from "../common/FlexContainer";
import StyledInput from "../common/StyledInput";
import { useState } from "react";

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

  return (
    <CreateContaier>
      <h3>Attributes</h3>
      <p>Add a property to your nft.</p>
      {attributes.map((value, index) => {
        if (index === 0) {
          return (
            <div key={index}>
              <h3 className="attributes-type">Category</h3>
              <FlexContainer>
                <StyleSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Type"
                  onChange={(e) => {
                    dispatch(
<<<<<<< HEAD
                      incrementAttributes({ atype: e.target.value, index })
                    );
                  }}
                >
                  <MenuItem value={"Category"}>Category</MenuItem>
                </StyleSelect>
                <StyledInput
                  onChane={(e) =>
=======
                      incrementAttributes({
                        atype: "system",
                        akey: e.target.value,
                        index,
                      })
                    );
                  }}
                >
                  <MenuItem value="category">Category</MenuItem>
                </StyleSelect>
                <StyledInput
                  onChange={(e) =>
>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84
                    dispatch(
                      incrementAttributes({ avalue: e.target.value, index })
                    )
                  }
                />
              </FlexContainer>
            </div>
          );
        } else if (index === 1) {
          return (
            <div key={index}>
              <h3 className="attributes-type">Collection</h3>
              <FlexContainer>
                <StyleSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Type"
                  onChange={(e) => {
                    dispatch(
<<<<<<< HEAD
                      incrementAttributes({ atype: e.target.value, index })
                    );
                  }}
                >
                  <MenuItem value={"Collection"}>Collection</MenuItem>
                </StyleSelect>
                <StyledInput
                  onChane={(e) =>
=======
                      incrementAttributes({
                        atype: "system",
                        akey: e.target.value,
                        index,
                      })
                    );
                  }}
                >
                  <MenuItem value="collection">Collection</MenuItem>
                </StyleSelect>
                <StyledInput
                  onChange={(e) =>
>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84
                    dispatch(
                      incrementAttributes({ avalue: e.target.value, index })
                    )
                  }
                />
              </FlexContainer>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <h3 className="attributes-type">Properties</h3>
              <FlexContainer>
                <StyleSelect
                  label="Type *"
                  // value={"Type"}
                  onChange={(e) =>
                    dispatch(
<<<<<<< HEAD
                      incrementAttributes({ atype: e.target.value, index })
                    )
                  }
                >
                  <MenuItem value={"Base"}>Base</MenuItem>
                  <MenuItem value={"Eyes"}>Eyes</MenuItem>
                  <MenuItem value={"Level"}>Level</MenuItem>
                  <MenuItem value={"Stamina"}>Stamina</MenuItem>
                  <MenuItem value={"Personality"}>Personality</MenuItem>
=======
                      incrementAttributes({
                        atype: "plain",
                        akey: e.target.value,
                        index,
                      })
                    )
                  }
                >
                  <MenuItem value="Base">Base</MenuItem>
                  <MenuItem value="Eyes">Eyes</MenuItem>
                  <MenuItem value="Level">Level</MenuItem>
                  <MenuItem value="Stamina">Stamina</MenuItem>
                  <MenuItem value="Personality">Personality</MenuItem>
>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84
                </StyleSelect>

                <StyledInput
                  placeholder="Key"
                  onChange={(e) =>
                    dispatch(
<<<<<<< HEAD
                      incrementAttributes({ akey: e.target.value, index })
                    )
                  }
                />
                <StyledInput
                  placeholder="Value"
                  onChange={(e) =>
                    dispatch(
=======
>>>>>>> f9c90b4a6e5a7f0facb48d889c6943804858eb84
                      incrementAttributes({ avalue: e.target.value, index })
                    )
                  }
                />
              </FlexContainer>
            </div>
          );
        }
      })}

      <Button onClick={() => dispatch(incrementAttributes("plus"))}>
        AddMore
      </Button>
    </CreateContaier>
  );
};

export default UploadAttributes;
