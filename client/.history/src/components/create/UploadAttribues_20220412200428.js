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
  const { register, handleSubmit } = useForm();
  const [formCount, setFormCount] = useState([1]);

  const plusAttributes = (data) => {
    dispatch(incrementAttributes(data));
  };
  const plusCount = () => {
    setFormCount([...formCount, [1]]);
  };
  return (
    <CreateContaier>
      <h3>Attributes</h3>
      <p>Add a property to your nft.</p>
      {formCount.map((attribute, idx) => {
        return (
          <FlexContainer>
            <form onSubmit={handleSubmit(plusAttributes)}>
              <StyledInput
                type="text"
                placeholder="Name"
                {...register('name')}
              />
              <StyledInput
                type="text"
                placeholder="Value"
                {...register('value')}
              />
              <Button type="submit">+</Button>
            </form>
          </FlexContainer>
        );
      })}

      {/* {name:'',value:''} */}
      <Button onClick={() => plusCount()}>AddMore</Button>
    </CreateContaier>
  );
};

export default UploadAttributes;
