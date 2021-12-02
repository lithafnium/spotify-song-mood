import React, { useEffect, useState } from "react";
import { FadeIn, Button, Input } from "@app/shared/components/index";
import {
  Container,
  ContainerInner,
  Inputs,
  PreloadContainer,
  Preloader,
} from "./styles";
import { apiGet, apiPost } from "@app/utils/api";
import { colors } from "@app/styles/styles";
import useKeyPress from "@app/shared/utils/useKeyPress";
import SpotifyPlayer from "@app/shared/components/SpotifyPlayer";

import Songs from "./components/Songs/songs";

const Home = () => {
  const [token, setAccessToken] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(-1);

  const enter = useKeyPress("Enter");

  const handleClick = async () => {
    setSelected(-1);
    setSongData([]);
    setLoading(true);
    window.location.href = "http://127.0.0.1:5000/login";
    // await apiGet("/login", {})
    //   .then((res) => console.log(res))
    //   .catch((e) => console.log(e));

    // const response = await apiPost("/search", {
    //   body: {
    //     songTitle,
    //   },
    // });
    // setLoading(false);
    // console.log(response.response.data);
    // setSongData(response.response.data);
  };

  useEffect(() => {
    // const getAccessToken = async () => {
    //   const response = await apiGet("/access-token", {});
    //   setAccessToken(response.data);
    // };
    // getAccessToken();
  }, []);

  useEffect(() => {
    if (enter && focused) {
      handleClick();
    }
  }, [enter]);

  useEffect(() => {
    if (selected != -1) {
      setSongData((songData) => [songData[selected]]);
      setSelected(0);
    }
  }, [selected]);

  return (
    <Container>
      <ContainerInner>
        <FadeIn>
          <h1 style={{ color: colors.HIGHLIGHT }}>Spotify Mood Detector</h1>
          <Inputs>
            <Input
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onChange={(e) => setSongTitle(e.target.value)}
              placeholder="Song title..."
              borderRadius="40px 0px 0px 40px"
            />

            <Button
              padding="0px 30px"
              borderRadius="0px 40px 40px 0px"
              fontSize="1em"
              backgroundColor={colors.SECONDARY}
              hoverColor={colors.PRIMARY}
              color={colors.HIGHLIGHT}
              onClick={() => handleClick()}
            >
              Search
            </Button>
          </Inputs>

          <PreloadContainer loading={loading}>
            <Preloader loading={loading}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </Preloader>
          </PreloadContainer>
          {songData && (
            <Songs
              songData={songData}
              setSongData={setSongData}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </FadeIn>
      </ContainerInner>
    </Container>
  );
};

export default Home;
