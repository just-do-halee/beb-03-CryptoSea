import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '@mui/material';
import { incrementAttributes } from '../../redux/createNFT/nftSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import CreateContaier from '../common/CreateContainer';
import FlexContainer from '../common/FlexContainer';
import StyledInput from '../common/StyledInput';

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
            <form onSubmit>
              <StyledInput type="text" placeholder="Name" />
              <StyledInput type="text" placeholder="Value" />
              <Button type="submit">+</Button>
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
