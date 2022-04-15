import NFTContainer from "../../components/common/NFTContainer";
import FlexContainer from "../../components/common/FlexContainer";
const RenderSearch = (props) => {
  const { data } = props;

  return (
    <FlexContainer>
      <NFTContainer data={data}></NFTContainer>
    </FlexContainer>
  );
};

export default RenderSearch;
