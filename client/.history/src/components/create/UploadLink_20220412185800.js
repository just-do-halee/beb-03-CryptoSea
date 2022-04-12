import { useDispatch } from 'react-redux';

import FormInput from '../common/FormInput.js';
import CreateContaier from '../common/CreateContainer.js';
import { incrementLink } from '../../redux/createNFT/nftSlice.js';
import StyledInput from '../common/StyledInput.js';

const UploadLink = () => {
  const dispatch = useDispatch();
  return (
    <CreateContaier>
      <h3>External link</h3>
      <p>
        OpenSea will include a link to this URL on this item's detail page, so
        that users can click to learn more about it. You are welcome to link to
        your own webpage with more details.
      </p>
      <FormInput
        type="text"
        placeholder="https://yoursite.io/item/123"
        onChange={(e) => dispatch(incrementLink(e.target.value))}
      />
    </CreateContaier>
  );
};

export default UploadLink;
