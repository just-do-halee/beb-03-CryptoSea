import styled from "styled-components";

import NFTContainer from "../../components/common/NFTContainer";
import FlexContainer from "../../components/common/FlexContainer";
import Footbar from "../../components/common/Footbar";

const Container = styled(FlexContainer)`
  width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
`;
const RenderSearch = (props) => {
  const { data } = props;

  return (
    <>
      <Container>
        <NFTContainer data={data}></NFTContainer>
      </Container>
      <Footbar />
    </>
  );
};

export default RenderSearch;
