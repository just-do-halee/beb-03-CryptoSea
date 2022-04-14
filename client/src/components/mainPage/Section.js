import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Container = styled.section`
  /* background-color: skyblue; */
  /* width: 1500px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border: 1px solid black; */
  /* background-color: red; */
  margin-bottom: 70px;
  border-bottom: 1px solid whitesmoke;
  @media screen and (max-width: 1200px) {
    width: 1000px;
    flex-direction: column;
  }
  @media screen and (max-width: 1000px) {
    width: 700px;
  }
`;

const LeftBox = styled.div`
  width: 800px;
  height: 600px;
  /* background-color: red; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */

  h2 {
    width: 500px;
    font-size: 3rem;
  }
  p {
    width: 350px;
    font-size: 1.5rem;
  }
  Button {
    width: 200px;
    height: 50px;
    margin-right: 30px;
    margin-top: 50px;
    border-radius: 15px;
  }
  @media screen and (max-width: 1000px) {
    align-items: center;
  }
`;

const RightBox = styled.div`
  width: 500px;
  height: 600px;
  /* background-color: orange; */

  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
  img {
    width: 400px;
  }
`;
const Section = () => {
  return (
    <>
      <Container>
        <LeftBox>
          <h2>Discover, collect, and sell extraordinary NFTs</h2>
          <p>OpenSea is the world's first and largest NFT marketplace</p>
          <div>
            <Button variant="contained">Explore</Button>
            {/* 링크걸기 */}
            <Button variant="outlined">
              <Link to="/create"> Create</Link>
            </Button>
            {/* 링크 걸기 */}
          </div>
        </LeftBox>
        <RightBox>
          <img
            src="https://lh3.googleusercontent.com/uMYGSBdEi-kLG7_z2dfOoGQYRFdU9_Dw0LSwzsG94MCGnuQawRw9rG-mMpBHY65we-ugoiD80NCiDzK8DI7TjfOWcHKJRqUrhbIQnxk=s550"
            alt="zz"
          />{' '}
          {/* 이미지 받아와야함. */}
          <div className="userInfo"> {/* 난중에 수정 */}</div>
        </RightBox>
      </Container>
    </>
  );
};

export default Section;
