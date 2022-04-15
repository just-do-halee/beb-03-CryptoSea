import styled from "styled-components";
import FlexContainer from "./FlexContainer.js";

const Container = styled(FlexContainer)`
  width: 1300px;
  margin: 0 auto;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const NFTContainer = (props) => {
  const { data } = props;
  const { name, description, url } = data;
  return;
};

export default NFTContainer;
