import { Button } from '@mui/material';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
const Container = styled.section`
  height: 1000px;
  background-color: #f8fdff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */

  h1 {
    margin: 0 auto 50px;
    font-size: 2rem;
    text-align: center;
  }
  p {
    font-size: 1.5rem;
    text-align: center;
  }
  Button {
    width: 250px;
    height: 50px;
    margin-right: 30px;
    margin-top: 50px;
    border-radius: 15px;
  }
  @media screen and (max-width: 1200px) {
    margin-top: 100px;
    width: 1000px;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const VideoSection = () => {
  return (
    <>
      <Container>
        <h1>Meet OpenSea</h1>
        <p>The NFT marketplace with everything for everyone</p>
        <ReactPlayer
          url="https://youtu.be/gfGuPd1CELo?list=TLGG0LpIW2LMI8cxMDA0MjAyMg"
          controls
          width="1000px"
          height="500px"
        ></ReactPlayer>
        <Button variant="contained">Explore the marketplace</Button>
        {/* 링크삽입 */}
      </Container>
    </>
  );
};

export default VideoSection;
