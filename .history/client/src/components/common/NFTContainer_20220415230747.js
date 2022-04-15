import styled from "styled-components";
import FlexContainer from "./FlexContainer.js";
import NFT from "./NFT.js";

const Container = styled(FlexContainer)`
  width: 1300px;
  margin: 0 auto;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const NFTContainer = (props) => {
  const { data } = props;

  return (
    <Container>
      {data.map((data, index) => {
        const { name, description, url } = data;
        return (
          <div key={index}>
            <NFT
              name={name}
              image={url}
              description={description}
              price={"1.0"}
            ></NFT>
          </div>
        );
      })}
    </Container>
  );
};

export default NFTContainer;
