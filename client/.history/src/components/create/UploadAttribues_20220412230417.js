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
  };
  return (
    <CreateContaier>
      <h3>Attributes</h3>
      <p>Add a property to your nft.</p>
      {attributes.map((value, index) => {
        return (
          <>
            <FlexContainer>
              <StyledInput
                placeholder="Name"
                onChange={(e) =>
                  dispatch(incrementAttributes({ name: e.target.value, index }))
                }
              />
              <StyledInput
                placeholder="Value"
                onChange={(e) =>
                  dispatch(
                    incrementAttributes({ value: e.target.value, index })
                  )
                }
              />
            </FlexContainer>
          </>
        );
      })}
      {/* 폼을 돌아도 하나만 들어가 ㅠㅠㅠ 이거 어떻게 해결할수 있을까 ㅠㅠ */}
      <Button onClick={() => dispatch(incrementAttributes('plus'))}>
        AddMore
      </Button>
    </CreateContaier>
  );
};

export default UploadAttributes;
