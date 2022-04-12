import styled from 'styled-components';

import CreateContaier from '../common/CreateContainer';
import FlexContainer from '../common/FlexContainer';
import StyledInput from '../common/StyledInput';

const UploadAttributes = () => {
  return (
    <CreateContaier>
      <h3>Attributes</h3>
      <p>Add a property to your nft.</p>
      <FlexContainer>
        <StyledInput type="text" placeholder="Name" />
        <StyledInput type="text" placeholder="Value" />
      </FlexContainer>
    </CreateContaier>
  );
};

export default UploadAttributes;
