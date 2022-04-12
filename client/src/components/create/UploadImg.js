import styled from 'styled-components';
import { FaRegImage } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import CreateContaier from '../common/CreateContainer.js';
import { incrementImgFile } from '../../redux/createNFT/nftSlice.js';

const Container = styled(CreateContaier)`
  div {
    font-family: Poppins, sans-serif;
    line-height: 1.5;
    font-size: 14px;
    color: rgb(53, 56, 64);
    box-sizing: border-box;
    height: 257px;
    width: 350px;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    padding: 4px;
    cursor: pointer;
    border: 3px dashed rgb(204, 204, 204);
    border-radius: 10px;

    input {
      cursor: pointer;
      box-sizing: border-box;
      text-rendering: optimizelegibility;
      font-feature-settings: 'liga' !important;
      font-size: 84px !important;
      font-weight: normal;
      font-style: normal;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-smoothing: antialiased;
      color: rgb(204, 204, 204);
    } //input 수정해야함.
  }
`;

const UploadImg = () => {
  const dispatch = useDispatch();
  return (
    <Container>
      <h3>
        Image,Video,Audio, or 3D Model<span>*</span>
      </h3>
      <p>
        File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB,
        GLTF. Max size: 100 MB
      </p>
      <div>
        <FaRegImage size={50} color="#aaa2a2">
          <input
            type="file"
            onChange={(e) => dispatch(incrementImgFile(e.target.value))} //수정해야함.
          />
        </FaRegImage>
      </div>
    </Container>
  );
};

export default UploadImg;
