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
  const attributes = useSelector((state) => state.createNFT.attributes);
  const plusCount = () => {
    setFormCount([...formCount, [1]]);
  };
  const plusAttributes = (data) => {
    console.log(data);
    dispatch(incrementAttributes(data));
  };
  return (
    <CreateContaier>
      <h3>Attributes</h3>
      <p>Add a property to your nft.</p>
      {formCount.map((value, index) => {
        return (
          <FlexContainer key={index}>
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
      {/* 폼을 돌아도 하나만 들어가 ㅠㅠㅠ 이거 어떻게 해결할수 있을까 ㅠㅠ */}
      <Button onClick={() => plusCount()}>AddMore</Button>
    </CreateContaier>
  );
};

export default UploadAttributes;
