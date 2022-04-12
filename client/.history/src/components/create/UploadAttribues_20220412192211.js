import styled from 'styled-components';

import CreateContaier from '../common/CreateContainer';
import FlexContainer from '../common/FlexContainer';
import StyledInput from '../common/StyledInput';
import { Button } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { incrementAttributes } from '../../redux/createNFT/nftSlice';
const UploadAttributes = () => {
  const [attributes, setAttributes] = useState([1]);
  const dispatch = useDispatch();
  return (
    <CreateContaier>
      <h3>Attributes</h3>
      <p>Add a property to your nft.</p>

      <FlexContainer>
        <form action="">
          <StyledInput
            type="text"
            placeholder="Name"
            onChange={(e) => dispatch(incrementAttributes(e.target.value))}
          />
          <StyledInput type="text" placeholder="Value" />
        </form>
      </FlexContainer>
      {/* {name:'',value:''} */}
      <Button>AddMore</Button>
    </CreateContaier>
  );
};

export default UploadAttributes;
