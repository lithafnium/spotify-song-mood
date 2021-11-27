import React, { useEffect } from "react";
import { FadeIn, Button } from "@app/shared/components/index";
import { Container, ContainerInner } from "./styles";
import { apiGet } from "@app/utils/api";

const Home = () => {
  const handleClick = async () => {
    const response = await apiGet("/test", {});
    console.log(response);
  };

  return (
    <Container>
      <ContainerInner>
        <FadeIn>
          <Button padding="20px 40px" onClick={() => handleClick()}>
            Test Endpoint
          </Button>
        </FadeIn>
      </ContainerInner>
    </Container>
  );
};

export default Home;
