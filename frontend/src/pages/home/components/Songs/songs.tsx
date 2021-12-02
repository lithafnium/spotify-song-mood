import React from "react";
import {
  Container,
  Image,
  ImageContainer,
  Title,
  Artists,
  Button,
  SongsContainer,
} from "./styles";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons";

import { animated, useTransition } from "react-spring";
// https://codesandbox.io/s/goofy-chaplygin-whvt4

const Songs = ({ songData, selected, setSelected }: any) => {
  const transition = useTransition(
    songData.map((s: any, i: number) => ({ ...s, key: i })),
    {
      key: (item) => item.key,
      from: { opacity: 0, transform: "translateY(50px)" },
      enter: { opacity: 1, transform: "translateY(0px)" },
      leave: { opacity: 0, transform: "translateY(50px)" },
      delay: 500,
    }
  );

  return (
    <SongsContainer>
      {transition((styles, item) => {
        return (
          item && (
            <animated.div style={styles}>
              <Container
                key={item.key}
                hide={selected !== -1 && selected !== item.key}
                onClick={() => setSelected(item.key)}
              >
                <ImageContainer>
                  <Image src={item.image_url.url} />
                  <IconContext.Provider
                    value={{
                      color: "#ffffff",
                      size: "0.1em",
                      style: {
                        verticalAlign: "middle",
                        fontSize: "3em",
                      },
                    }}
                  >
                    <Button onClick={(e) => e.stopPropagation()}>
                      <FaPlay />
                    </Button>
                  </IconContext.Provider>
                </ImageContainer>
                <Title>{item.name}</Title>
                <Artists>{item.artists[0]}</Artists>
              </Container>
            </animated.div>
          )
        );
      })}
    </SongsContainer>
  );
};

export default Songs;
