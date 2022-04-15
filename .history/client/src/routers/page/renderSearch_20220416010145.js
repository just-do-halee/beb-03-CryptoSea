import NFTContainer from "../../components/common/NFTContainer";

const RenderSearch = (props) => {
  const { data } = props;

  return (
    <>
      <NFTContainer data={data}></NFTContainer>
    </>
  );
};

export default RenderSearch;
