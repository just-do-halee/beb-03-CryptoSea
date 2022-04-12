import styled from 'styled-components';

import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import CreateContaier from '../common/CreateContainer.js';
import { incrementImgFile } from '../../redux/createNFT/nftSlice.js';
import { Button } from '@mui/material';

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
      display: none;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;

      color: rgb(204, 204, 204);
    } //input 수정해야함.
  }
`;

const UploadImg = () => {
  const dispatch = useDispatch();

  const nftImgInput = useRef();
  const onImgInputBtnClick = (e) => {
    e.preventDefault();
    nftImgInput.current.click();
  };

  const [imageSrc, setImageSrc] = useState('');
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const handleChangeFile = (event) => {
    console.log(event.target.files);
    setImgFile(event.target.files);
    //fd.append("file", event.target.files)
    setImgBase64([]);
    for (var i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          console.log(base64);
          if (base64) {
            //  images.push(base64.toString())
            var base64Sub = base64.toString();

            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
            //  setImgBase64(newObj);
            // 파일 base64 상태 업데이트
            //  console.log(images)
          }
        };
      }
    }
  };

  // const handleImage = (image) => {
  //   dispatch(incrementImgFile(image));
  // };
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
        {imageSrc && <img src={imageSrc} alt="" />}
        <input
          type="file"
          ref={nftImgInput}
          accept="image/*"
          onChange={(e) => {
            // handleImage(e.target.files[0]);
            setImageSrc(encodeFileToBase64(e.target.files[0]));
            handleChangeFile(e.target.files[0]);
          }}
        />
      </div>
      <Button onClick={onImgInputBtnClick}>이미지 업로드</Button>
    </Container>
  );
};

export default UploadImg;
