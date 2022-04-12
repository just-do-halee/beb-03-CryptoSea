import styled from 'styled-components';

import CreateContaier from '../common/CreateContainer';
import FlexContainer from '../common/FlexContainer';
import StyledInput from '../common/StyledInput';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementAttributes } from '../../redux/createNFT/nftSlice.js';

const UploadAttributes = () => {
  const dispatch = useDispatch();
  const attributes = useSelector((state) => state.createNFT.attributes);
  return (
    <CreateContaier>
      <h3>Attributes</h3>
      <p>Add a property to your nft.</p>
      {attributes.map((attribute, idx) => {
        return (
          <FlexContainer>
            <form action="">
              <StyledInput
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  dispatch(
                    incrementAttributes({ name: e.target.value, idx: idx })
                  )
                }
              />
              <StyledInput
                type="text"
                placeholder="Value"
                onChange={(e) =>
                  dispatch(incrementAttributes({ value: e.target.value, idx }))
                }
              />
              <Button>+</Button>
            </form>
          </FlexContainer>
        );
      })}

      {/* {name:'',value:''} */}
      <Button>AddMore</Button>
    </CreateContaier>
  );
};

export default UploadAttributes;
