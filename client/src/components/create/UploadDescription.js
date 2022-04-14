import styled from 'styled-components';
import CreateContaier from '../common/CreateContainer.js';
import FormInput from '../common/FromInput.js';
import { useDispatch } from 'react-redux';
import { incrementDescription } from '../../redux/createNFT/nftSlice.js';

const TextAreaInput = styled(FormInput)`
  height: 150px;
`;

const UploadDescription = () => {
  const dispatch = useDispatch();
  return (
    <CreateContaier>
      <h3>Description</h3>
      <p>
        The description will be included on the item's detail page underneath
        its image. Markdown syntax is supported.
      </p>
      <TextAreaInput
        type="text"
        placeholder="Provide a detailed description of your item"
        onChange={(e) => dispatch(incrementDescription(e.target.value))}
      />
    </CreateContaier>
  );
};

export default UploadDescription;
