import FormInput from '../common/FromInput.js';
import CreateContaier from '../common/CreateContainer.js';
import { useDispatch } from 'react-redux';
import { incrementName } from '../../redux/createNFT/nftSlice.js';

const UploadName = () => {
  const dispatch = useDispatch();
  return (
    <CreateContaier>
      <h3>
        Name <span>*</span>
      </h3>
      <FormInput
        type="text"
        placeholder="Item name"
        onChange={(e) => dispatch(incrementName(e.target.value))}
      />
    </CreateContaier>
  );
};

export default UploadName;
