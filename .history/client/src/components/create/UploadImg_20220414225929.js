import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import CreateContaier from "../common/CreateContainer.js";
import { incrementImgFile } from "../../redux/createNFT/nftSlice.js";
import { Button } from "@mui/material";

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
      font-feature-settings: "liga" !important;
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

  const [imageSrc, setImageSrc] = useState("");

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

  const encodeFileToArrayBuffer = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        dispatch(
          incrementImgFile({ buffer: reader.result, type: fileBlob.type })
        );
        resolve();
      };
    });
  };

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
            encodeFileToBase64(e.target.files[0]);
            encodeFileToArrayBuffer(e.target.files[0]);
          }}
        />
      </div>
      <Button onClick={onImgInputBtnClick}>이미지 업로드</Button>
    </Container>
  );
};

export default UploadImg;
