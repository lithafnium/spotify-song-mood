import React, { useEffect, useState } from "react";
import { FadeIn, Button, Input } from "@app/shared/components/index";
import { Container, ContainerInner, Inputs, Songs } from "./styles";
import { apiGet, apiPost } from "@app/utils/api";
import { colors } from "@app/styles/styles";

import Song from "./components/Song/song";

const Home = () => {
  const [songTitle, setSongTitle] = useState("");
  const [songData, setSongData] = useState(null);

  const handleClick = async () => {
    const response = await apiPost("/search", {
      body: {
        songTitle,
      },
    });
    console.log(response.response.data);
    setSongData(response.response.data);
  };

  return (
    <Container>
      <ContainerInner>
        <FadeIn>
          <h1 style={{ color: colors.HIGHLIGHT }}>Spotify Mood Detector</h1>
          <Inputs>
            <Input
              onChange={(e) => setSongTitle(e.target.value)}
              placeholder="Song title..."
              borderRadius="40px 0px 0px 40px"
            />

            <Button
              padding="15px 30px"
              borderRadius="0px 40px 40px 0px"
              fontSize="1em"
              backgroundColor={colors.SECONDARY}
              hoverColor={colors.PRIMARY}
              color={colors.HIGHLIGHT}
              onClick={() => handleClick()}
            >
              Search Song
            </Button>
          </Inputs>
          <Songs>
            {songData &&
              songData.map((s) => {
                return (
                  <FadeIn>
                    <Song
                      image={s.image_url.url}
                      title={s.name}
                      artist={s.artists[0]}
                    />
                  </FadeIn>
                );
              })}
          </Songs>
        </FadeIn>
      </ContainerInner>
    </Container>
  );
};

export default Home;
