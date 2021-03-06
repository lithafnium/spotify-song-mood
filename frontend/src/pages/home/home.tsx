import React, { useEffect, useState, useMemo } from "react";
import { FadeIn, Button, Input } from "@app/shared/components/index";
import {
  Container,
  ContainerInner,
  Inputs,
  PreloadContainer,
  Preloader,
} from "./styles";
import { useLocation } from "react-router-dom";
import { apiGet, apiPost } from "@app/utils/api";
import { colors } from "@app/styles/styles";
import useKeyPress from "@app/shared/utils/useKeyPress";

import Songs from "./components/Songs/songs";
import SpotifyPlayer from "@app/shared/components/SpotifyPlayer";

const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};

const Home = () => {
  const [token, setAccessToken] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [songData, setSongData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const params = useQuery();
  const enter = useKeyPress("Enter");

  const setSong = (key: number) => {
    setSongData([songData[key]]);
    setSelectedSong(songData[key]);
  };

  useEffect(() => {
    const accessToken = async (code: string) => {
      const response = await apiPost("/access-token", {
        body: {
          code,
        },
      });
      setAccessToken(response.response.data);
    };
    if (!params.has("code")) {
      window.location.href = "/login";
    } else {
      const code = params.get("code");
      accessToken(code);
    }
  }, []);

  const handleClick = async () => {
    setSelectedSong(null);
    setSongData([]);
    setLoading(true);

    const response = await apiPost("/search", {
      body: {
        songTitle,
      },
    });
    setLoading(false);
    console.log(response.response.data);
    setSongData(response.response.data);
  };

  useEffect(() => {
    if (enter && focused) {
      handleClick();
    }
  }, [enter]);

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
              selectedSong={selectedSong}
              setSong={setSong}
            />
          )}
          {token !== "" && <SpotifyPlayer accessToken={token} />}
        </FadeIn>
      </ContainerInner>
    </Container>
  );
};

export default Home;
