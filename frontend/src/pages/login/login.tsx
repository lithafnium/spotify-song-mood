import React from "react";
import { Container, ContainerInner } from "./styles";
import { FadeIn, Button } from "@app/shared/components/index";
import { colors } from "@app/styles/styles";

const Login = () => {
  const login = () => {
    window.location.href = "http://127.0.0.1:5000/login";
  };
  return (
    <Container>
      <ContainerInner>
        <FadeIn>
          <h1 style={{ color: colors.HIGHLIGHT }}>Spotify Mood Detector</h1>
          <Button
            padding="10px 50px"
            borderRadius="40px 40px 40px 40px"
            fontSize="1em"
            backgroundColor={colors.SECONDARY}
            hoverColor={colors.PRIMARY}
            color={colors.HIGHLIGHT}
            onClick={() => login()}
            style={{
              fontSize: "14px",
            }}
          >
            LOG IN TO SPOTIFY
          </Button>
        </FadeIn>
      </ContainerInner>
    </Container>
  );
};

export default Login;
