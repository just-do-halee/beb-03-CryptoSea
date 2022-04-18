import styled from "styled-components";

import NFTContainer from "../../components/common/NFTContainer";
import FlexContainer from "../../components/common/FlexContainer";
import Footbar from "../../components/common/Footbar";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SearchNFT } from '../../query'

const Container = styled(FlexContainer)`
  width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
`;

const RenderSearch = (props) => {
  const { keyword } = useParams();

  const { loading, data } = useQuery(...QUERY_SearchNFT(keyword));

  return (
    <>
      <Container>
        {loading === false && <NFTContainer data={data?.searchNFTs?.ok || []} />}
      </Container>
      <Footbar />
    </>
  );
};

export default RenderSearch;
