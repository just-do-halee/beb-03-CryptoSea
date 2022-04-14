import styled from "styled-components";
import categoryData from "../../data/categoryData";

const Container = styled.section`
  width: 1500px;
  margin: 0 auto;
  height: 1000px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */

  h1 {
    width: 100px;
    margin: 0 auto 50px;
    font-size: 2rem;
  }
  @media screen and (max-width: 1200px) {
    margin-top: 100px;
    width: 1000px;
  }
  @media screen and (max-width: 1000px) {
    width: 700px;
    height: 3000px;
    justify-content: flex-start;
  }
`;

const ItemContainer = styled.div`
  width: 1000px;
  height: 900px;

  display: flex;
  justify-content: space-around;
  /* align-items: flex-start; */
  flex-wrap: wrap;
  /* border: 1px solid red; */
  @media screen and (max-width: 1000px) {
    width: 700px;
  }
  @media screen and (max-width: 800px) {
    width: 500px;
  }
`;

const Item = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid whitesmoke;
  border-radius: 10px;
  margin-bottom: 20px;
  :hover {
    transition-duration: 0.3s;
    opacity: 0.5;
  }
  cursor: pointer;
  img {
    display: block;
    width: 300px;
    height: 210px;
    border-radius: 10px;
  }
  p {
    width: 300px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const Category = () => {
  const newPage = (categoryName) => {
    let name = categoryName;
    if (categoryName === "Domain Names") {
      name = "domain-names";
    }
    if (categoryName === "Virtual Worlds") {
      name = "virtual-worlds";
    }
    if (categoryName === "Photograpy") {
      name = "photography-category";
    }

    const url = "https://opensea.io/collection/" + name.toLowerCase();
    window.open(url, "_blank");
  };

  return (
    <>
      <Container>
        <h1>Category</h1>
        <ItemContainer>
          {categoryData.map((category, index) => {
            return (
              <Item key={index} onClick={() => newPage(category.title)}>
                <img src={category.link} alt={category.title} />
                <p>{category.title}</p>
              </Item>
            );
          })}
        </ItemContainer>
      </Container>
    </>
  );
};

export default Category;
