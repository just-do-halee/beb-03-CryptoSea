import styled from "styled-components";
import FlexContainer from "./FlexContainer.js";
import NFT from "./NFT.js";

const Container = styled(FlexContainer)`
  width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const NFTContainer = (props) => {
  const { data } = props;

  return (
    <Container>
      {data &&
        data.map((data, index) => {
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
