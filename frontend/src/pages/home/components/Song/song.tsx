import React from "react";
import {
  Container,
  Image,
  ImageContainer,
  Title,
  Artists,
  Button,
} from "./styles";
import { FaPlay } from "react-icons/fa";
import { IconContext } from "react-icons";

const Song = ({ index, image_url, name, artists, setSong }: any) => {
  return (
    <Container key={index} onClick={() => setSong(index)}>
      <ImageContainer>
        <Image src={image_url.url} />
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
      <Title>{name}</Title>
      <Artists>{artists[0]}</Artists>
    </Container>
  );
};

export default Song;
