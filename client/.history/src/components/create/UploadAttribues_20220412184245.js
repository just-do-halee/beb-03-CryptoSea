import styled from 'styled-components';

import CreateContaier from '../common/CreateContainer';
import FlexContainer from '../common/FlexContainer';

const UploadAttributes = () => {
  return (
    <CreateContaier>
      <h3>Attributes</h3>
      <p>Add a property to your nft.</p>
      <FlexContainer>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Value" />
      </FlexContainer>
    </CreateContaier>
  );
};

export default UploadAttributes;
