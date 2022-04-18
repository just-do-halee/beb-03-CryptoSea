import styled from "styled-components";
import FlexContainer from "./FlexContainer.js";
import NFT from "./NFT.js";
import { useNavigate } from "react-router-dom";

const Container = styled(FlexContainer)`
  width: 1000px;
  margin: 0 auto;
  margin-top: 50px;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
`;

const NFTContainer = (props) => {
  const navigate = useNavigate()
  const { data, edit } = props;


  return (
    <Container>
      {data &&
        data.map((data, index) => {
          const { name, description, url, tid, transaction } = data;
          return (
            <div key={index} onClick={() => {
              navigate(`/detail/${tid}`)
            }}>
              <NFT
                name={name}
                image={url}
                description={description}
                edit={edit}
                tid={tid}
                transaction={transaction}
              >
              </NFT>
            </div>
          );
        })}
    </Container >
  );
};

export default NFTContainer;
