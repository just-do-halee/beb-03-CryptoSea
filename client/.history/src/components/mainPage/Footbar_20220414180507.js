import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useRef, useState } from "react";

import StyledInput from "../common/StyledInput";
import communityLink from "../../data/communityLink";
// 아이콘 쓰고 싶은데 없는게 많네...

const Container = styled.footer`
  /* width: 1500px; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5187e4;
`;

const LeftBox = styled.div`
  font-family: Poppins, sans-serif;
  line-height: 1.5;
  font-size: 15px;
  color: rgb(255, 255, 255);
  height: 400px;
  display: flex;
  flex-direction: column;
  padding-left: 0px;
  -webkit-box-align: center;
  width: 50%;
  padding-top: 40px;
  align-items: flex-start;
  text-align: left;
  padding-right: 64px;
  /* border: 1px solid black; */
  h3 {
    font-size: 2rem;
  }
  p {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const RightBox = styled.div`
  font-family: Poppins, sans-serif;
  line-height: 1.5;
  font-size: 15px;
  color: rgb(255, 255, 255);
  text-align: left;
  box-sizing: border-box;

  -webkit-box-pack: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    margin-left: -5px;
    flex-wrap: wrap;
    flex-direction: row;
    color: white;
    /* border: 1px solid black; */
  }
`;

const StyledLink = styled.div`
  width: 80px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;

  color: white;
  border-radius: 10px;
  margin-right: 10px;
  cursor: pointer;
  :hover {
    color: black;
    opacity: 0.8;
    transition: 0.3s;
  }
`;

const Footbar = () => {
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const emailInput = useRef();
  const [emailText, setEmailText] = useState();

  const onChange = (e) => {
    setEmailText(e.target.value);
  };

  const onSubmit = (data) => {
    // console.log(data);
    const url = `https://blog.opensea.io/newsletter/?email=${data}`;
    window.open(url, "_blank");
  };
  const onError = (error) => {
    window.alert("이메일 형식에 맞게 입력하세요.");
    setEmailText("");
  };

  const communityPage = (url) => {
    window.open(url);
  };
  // console.log(watch());
  return (
    <Container>
      <LeftBox>
        <h3>Stay in the loop</h3>
        <p>
          Join our mailing list to stay in the loop with our newest feature
          releases, NFT drops, and tips and tricks for navigating OpenSea.
        </p>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <StyledInput
            type="text"
            placeholder="email address"
            ref={emailInput}
            value={emailText}
            onChange={onChange}
            {...register("Email", {
              required: true,
              pattern:
                /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
            })}
          ></StyledInput>
          <Button variant="contained" type="submit">
            Sign up
          </Button>
        </form>
      </LeftBox>
      <RightBox>
        <h3>Join the Community</h3>
        <div>
          {communityLink.map((community, index) => {
            return (
              <StyledLink
                key={index}
                onClick={() => {
                  communityPage(community.link);
                }}
              >
                {community.title}
              </StyledLink>
            );
          })}
        </div>
      </RightBox>
    </Container>
  );
};

export default Footbar;
